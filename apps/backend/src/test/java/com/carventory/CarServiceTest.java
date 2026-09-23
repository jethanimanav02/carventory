package com.carventory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.carventory.dto.CarRequest;
import com.carventory.dto.CarResponse;
import com.carventory.exception.CarNotFoundException;
import com.carventory.model.Car;
import com.carventory.model.CarCondition;
import com.carventory.model.CarStatus;
import com.carventory.repository.CarRepository;
import com.carventory.service.CarService;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

@ExtendWith(MockitoExtension.class)
class CarServiceTest {

    @Mock
    private CarRepository repository;

    @Mock
    private MongoTemplate mongoTemplate;

    private CarService service;

    @BeforeEach
    void setUp() {
        service = new CarService(repository, mongoTemplate);
    }

    @Test
    void testCreateCar() {
        CarRequest request = new CarRequest(
            "Honda", "City", "VX CVT", 2021, new BigDecimal("1190000"), 28000,
            "Petrol", "Automatic", "1498 cc", "White", 1,
            "MH-04-AB-1234", LocalDate.of(2025, 12, 31), "Ulhasnagar, Maharashtra",
            "Well maintained.", List.of(), null, List.of("Touchscreen"),
            CarStatus.AVAILABLE, CarCondition.USED
        );

        Car saved = new Car();
        saved.setId("mongo-123");
        saved.setBrand("Honda");
        saved.setModel("City");
        saved.setPrice(new BigDecimal("1190000"));
        saved.setStatus(CarStatus.AVAILABLE);
        saved.setCondition(CarCondition.USED);

        when(repository.save(any(Car.class))).thenReturn(saved);

        CarResponse response = service.create(request);
        assertNotNull(response);
        assertEquals("mongo-123", response.id());
        assertEquals("Honda", response.brand());
        assertEquals("City", response.model());
    }

    @Test
    void testFindByIdSuccess() {
        Car car = new Car();
        car.setId("mongo-123");
        car.setBrand("Hyundai");
        car.setModel("Creta");

        when(repository.findById("mongo-123")).thenReturn(Optional.of(car));

        CarResponse response = service.findById("mongo-123");
        assertNotNull(response);
        assertEquals("Hyundai", response.brand());
    }

    @Test
    void testFindByIdNotFound() {
        when(repository.findById("non-existing")).thenReturn(Optional.empty());

        assertThrows(CarNotFoundException.class, () -> service.findById("non-existing"));
    }

    @Test
    void testFindAllWithFilters() {
        Car car = new Car();
        car.setId("c1");
        car.setBrand("Maruti");
        car.setModel("Swift");

        when(mongoTemplate.find(any(Query.class), any())).thenReturn(List.of(car));

        List<CarResponse> result = service.findAll("Swift", null, "Petrol", null, null, null, null);
        assertEquals(1, result.size());
        assertEquals("Swift", result.get(0).model());
    }

    @Test
    void testDeleteCar() {
        when(repository.existsById("mongo-123")).thenReturn(true);

        service.delete("mongo-123");
        verify(repository).deleteById("mongo-123");
    }

    @Test
    void testDeleteCarNotFound() {
        when(repository.existsById("mongo-404")).thenReturn(false);

        assertThrows(CarNotFoundException.class, () -> service.delete("mongo-404"));
    }
}
