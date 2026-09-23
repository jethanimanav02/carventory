package com.carventory.config;

import com.carventory.model.Car;
import com.carventory.model.CarCondition;
import com.carventory.model.CarStatus;
import com.carventory.repository.CarRepository;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CarRepository repository;

    public DataSeeder(CarRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            Car hondaCity = new Car();
            hondaCity.setBrand("Honda");
            hondaCity.setModel("City");
            hondaCity.setVariant("VX CVT");
            hondaCity.setYear(2021);
            hondaCity.setPrice(new BigDecimal("1190000"));
            hondaCity.setKmDriven(28000);
            hondaCity.setFuel("Petrol");
            hondaCity.setTransmission("Automatic");
            hondaCity.setEngine("1498 cc");
            hondaCity.setColor("White");
            hondaCity.setNumberOfOwners(1);
            hondaCity.setRegistrationNumber("MH-04-AB-1234");
            hondaCity.setInsuranceValidity(LocalDate.of(2025, 12, 31));
            hondaCity.setLocation("Ulhasnagar, Maharashtra");
            hondaCity.setDescription("Well maintained Honda City with full service history.");
            hondaCity.setPhotos(List.of("https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85"));
            hondaCity.setFeatures(List.of("Touchscreen", "Rear Camera", "Sunroof", "Alloy Wheels"));
            hondaCity.setStatus(CarStatus.AVAILABLE);
            hondaCity.setCondition(CarCondition.USED);
            hondaCity.touchForCreate();

            Car hyundaiCreta = new Car();
            hyundaiCreta.setBrand("Hyundai");
            hyundaiCreta.setModel("Creta");
            hyundaiCreta.setVariant("SX (O) 1.5 Petrol");
            hyundaiCreta.setYear(2022);
            hyundaiCreta.setPrice(new BigDecimal("1485000"));
            hyundaiCreta.setKmDriven(28400);
            hyundaiCreta.setFuel("Petrol");
            hyundaiCreta.setTransmission("Automatic");
            hyundaiCreta.setEngine("1497 cc");
            hyundaiCreta.setColor("Titan Grey");
            hyundaiCreta.setNumberOfOwners(1);
            hyundaiCreta.setRegistrationNumber("MH-02-XY-5678");
            hyundaiCreta.setInsuranceValidity(LocalDate.of(2026, 6, 30));
            hyundaiCreta.setLocation("Mumbai, Maharashtra");
            hyundaiCreta.setDescription("A carefully inspected, one-owner Creta with panoramic sunroof.");
            hyundaiCreta.setPhotos(List.of("https://images.unsplash.com/photo-1631548086010-7d3c1f9ee55e?auto=format&fit=crop&w=1200&q=85"));
            hyundaiCreta.setFeatures(List.of("Panoramic sunroof", "360° camera", "Ventilated seats"));
            hyundaiCreta.setStatus(CarStatus.AVAILABLE);
            hyundaiCreta.setCondition(CarCondition.USED);
            hyundaiCreta.touchForCreate();

            Car tataNexon = new Car();
            tataNexon.setBrand("Tata");
            tataNexon.setModel("Nexon");
            tataNexon.setVariant("XZ Plus Diesel");
            tataNexon.setYear(2023);
            tataNexon.setPrice(new BigDecimal("1250000"));
            tataNexon.setKmDriven(18000);
            tataNexon.setFuel("Diesel");
            tataNexon.setTransmission("Manual");
            tataNexon.setEngine("1497 cc");
            tataNexon.setColor("Daytona Grey");
            tataNexon.setNumberOfOwners(1);
            tataNexon.setRegistrationNumber("MH-12-CD-9012");
            tataNexon.setInsuranceValidity(LocalDate.of(2026, 3, 15));
            tataNexon.setLocation("Pune, Maharashtra");
            tataNexon.setDescription("Rugged and safe 5-star safety rated compact SUV.");
            tataNexon.setPhotos(List.of("https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=1200&q=85"));
            tataNexon.setFeatures(List.of("Touchscreen", "Cruise Control", "Projector Headlamps"));
            tataNexon.setStatus(CarStatus.AVAILABLE);
            tataNexon.setCondition(CarCondition.USED);
            tataNexon.touchForCreate();

            repository.saveAll(List.of(hondaCity, hyundaiCreta, tataNexon));
        }
    }
}
