package com.carventory.service;

import com.carventory.dto.CarRequest;
import com.carventory.dto.CarResponse;
import com.carventory.model.Car;
import com.carventory.model.CarCondition;
import com.carventory.model.CarStatus;
import com.carventory.exception.CarNotFoundException;
import com.carventory.repository.CarRepository;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
public class CarService {

    private final CarRepository repository;
    private final MongoTemplate mongoTemplate;

    public CarService(CarRepository repository, MongoTemplate mongoTemplate) {
        this.repository = repository;
        this.mongoTemplate = mongoTemplate;
    }

    public List<CarResponse> findAll(String search, String condition, String fuel,
                                    String transmission, String status,
                                    BigDecimal minPrice, BigDecimal maxPrice) {
        Query query = new Query();
        List<Criteria> criteriaList = new ArrayList<>();

        if (search != null && !search.isBlank()) {
            String trimmedSearch = search.trim();
            Pattern searchPattern = Pattern.compile(Pattern.quote(trimmedSearch), Pattern.CASE_INSENSITIVE);
            criteriaList.add(new Criteria().orOperator(
                Criteria.where("brand").regex(searchPattern),
                Criteria.where("model").regex(searchPattern),
                Criteria.where("variant").regex(searchPattern),
                Criteria.where("fuel").regex(searchPattern),
                Criteria.where("transmission").regex(searchPattern),
                Criteria.where("location").regex(searchPattern)
            ));
        }

        if (condition != null && !condition.isBlank()) {
            CarCondition cond = enumOrNull(condition, CarCondition.class);
            if (cond != null) {
                criteriaList.add(Criteria.where("condition").is(cond));
            }
        }

        if (fuel != null && !fuel.isBlank()) {
            Pattern fuelPattern = Pattern.compile("^" + Pattern.quote(fuel.trim()) + "$", Pattern.CASE_INSENSITIVE);
            criteriaList.add(Criteria.where("fuel").regex(fuelPattern));
        }

        if (transmission != null && !transmission.isBlank()) {
            Pattern transPattern = Pattern.compile("^" + Pattern.quote(transmission.trim()) + "$", Pattern.CASE_INSENSITIVE);
            criteriaList.add(Criteria.where("transmission").regex(transPattern));
        }

        if (status != null && !status.isBlank()) {
            CarStatus st = enumOrNull(status, CarStatus.class);
            if (st != null) {
                criteriaList.add(Criteria.where("status").is(st));
            }
        }

        if (minPrice != null && maxPrice != null) {
            criteriaList.add(Criteria.where("price").gte(minPrice).lte(maxPrice));
        } else if (minPrice != null) {
            criteriaList.add(Criteria.where("price").gte(minPrice));
        } else if (maxPrice != null) {
            criteriaList.add(Criteria.where("price").lte(maxPrice));
        }

        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        query.with(Sort.by(Sort.Direction.DESC, "createdAt"));

        return mongoTemplate.find(query, Car.class)
            .stream()
            .map(this::toResponse)
            .toList();
    }

    public CarResponse findById(String id) {
        try {
            return repository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new CarNotFoundException(id));
        } catch (IllegalArgumentException e) {
            throw new CarNotFoundException(id);
        }
    }

    public CarResponse create(CarRequest request) {
        Car car = new Car();
        copy(request, car);
        car.touchForCreate();
        Car saved = repository.save(car);
        return toResponse(saved);
    }

    public CarResponse update(String id, CarRequest request) {
        Car car = repository.findById(id)
            .orElseThrow(() -> new CarNotFoundException(id));
        copy(request, car);
        car.touchForUpdate();
        Car saved = repository.save(car);
        return toResponse(saved);
    }

    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new CarNotFoundException(id);
        }
        repository.deleteById(id);
    }

    private void copy(CarRequest request, Car car) {
        car.setBrand(request.brand());
        car.setModel(request.model());
        car.setVariant(request.variant());
        car.setYear(request.year());
        car.setPrice(request.price());
        car.setKmDriven(request.kmDriven());
        car.setFuel(request.fuel());
        car.setTransmission(request.transmission());
        car.setEngine(request.engine());
        car.setColor(request.color());
        car.setNumberOfOwners(request.numberOfOwners());
        car.setRegistrationNumber(request.registrationNumber());
        car.setInsuranceValidity(request.insuranceValidity());
        car.setLocation(request.location());
        car.setDescription(request.description());
        car.setPhotos(request.photos());
        car.setVideo(request.video());
        car.setFeatures(request.features());
        car.setStatus(request.status());
        car.setCondition(request.condition());
    }

    private CarResponse toResponse(Car car) {
        return new CarResponse(
            car.getId(),
            car.getBrand(),
            car.getModel(),
            car.getVariant(),
            car.getYear(),
            car.getPrice(),
            car.getKmDriven(),
            car.getFuel(),
            car.getTransmission(),
            car.getEngine(),
            car.getColor(),
            car.getNumberOfOwners(),
            car.getRegistrationNumber(),
            car.getInsuranceValidity(),
            car.getLocation(),
            car.getDescription(),
            car.getPhotos(),
            car.getVideo(),
            car.getFeatures(),
            car.getStatus(),
            car.getCondition(),
            car.getCreatedAt(),
            car.getUpdatedAt()
        );
    }

    private static <T extends Enum<T>> T enumOrNull(String value, Class<T> type) {
        if (value == null || value.isBlank()) {
            return null;
        }
        try {
            return Enum.valueOf(type, value.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
