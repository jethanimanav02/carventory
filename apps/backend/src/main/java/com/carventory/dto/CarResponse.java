package com.carventory.dto;

import com.carventory.model.CarCondition;
import com.carventory.model.CarStatus;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

public record CarResponse(
    String id,
    String brand,
    String model,
    String variant,
    Integer year,
    BigDecimal price,
    Integer kmDriven,
    String fuel,
    String transmission,
    String engine,
    String color,
    Integer numberOfOwners,
    String registrationNumber,
    LocalDate insuranceValidity,
    String location,
    String description,
    List<String> photos,
    String video,
    List<String> features,
    CarStatus status,
    CarCondition condition,
    Instant createdAt,
    Instant updatedAt
) {}
