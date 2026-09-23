package com.carventory.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.FieldType;

@Document(collection = "cars")
public class Car {
    @Id
    private String id;
    private String brand;
    private String model;
    private String variant;
    private Integer year;
    @Field(targetType = FieldType.DECIMAL128)
    private BigDecimal price;
    private Integer kmDriven;
    private String fuel;
    private String transmission;
    private String engine;
    private String color;
    private Integer numberOfOwners;
    private String registrationNumber;
    private LocalDate insuranceValidity;
    private String location;
    private String description;
    private List<String> photos = new ArrayList<>();
    private String video;
    private List<String> features = new ArrayList<>();
    private CarStatus status;
    private CarCondition condition;
    private Instant createdAt;
    private Instant updatedAt;

    public Car() {}

    public void touchForCreate() {
        var now = Instant.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    public void touchForUpdate() {
        this.updatedAt = Instant.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getVariant() { return variant; }
    public void setVariant(String variant) { this.variant = variant; }

    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getKmDriven() { return kmDriven; }
    public void setKmDriven(Integer kmDriven) { this.kmDriven = kmDriven; }

    public String getFuel() { return fuel; }
    public void setFuel(String fuel) { this.fuel = fuel; }

    public String getTransmission() { return transmission; }
    public void setTransmission(String transmission) { this.transmission = transmission; }

    public String getEngine() { return engine; }
    public void setEngine(String engine) { this.engine = engine; }

    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }

    public Integer getNumberOfOwners() { return numberOfOwners; }
    public void setNumberOfOwners(Integer numberOfOwners) { this.numberOfOwners = numberOfOwners; }

    public String getRegistrationNumber() { return registrationNumber; }
    public void setRegistrationNumber(String registrationNumber) { this.registrationNumber = registrationNumber; }

    public LocalDate getInsuranceValidity() { return insuranceValidity; }
    public void setInsuranceValidity(LocalDate insuranceValidity) { this.insuranceValidity = insuranceValidity; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getPhotos() { return photos; }
    public void setPhotos(List<String> photos) { this.photos = photos == null ? new ArrayList<>() : photos; }

    public String getVideo() { return video; }
    public void setVideo(String video) { this.video = video; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features == null ? new ArrayList<>() : features; }

    public CarStatus getStatus() { return status; }
    public void setStatus(CarStatus status) { this.status = status; }

    public CarCondition getCondition() { return condition; }
    public void setCondition(CarCondition condition) { this.condition = condition; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
