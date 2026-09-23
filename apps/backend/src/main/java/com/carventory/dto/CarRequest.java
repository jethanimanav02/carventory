package com.carventory.dto;

import com.carventory.model.CarCondition;
import com.carventory.model.CarStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record CarRequest(
    @NotBlank String brand,
    @NotBlank String model,
    @NotBlank String variant,
    @NotNull @Min(1980) Integer year,
    @NotNull @DecimalMin("0.01") BigDecimal price,
    @NotNull @Min(0) Integer kmDriven,
    @NotBlank String fuel,
    @NotBlank String transmission,
    String engine,
    String color,
    @Min(0) Integer numberOfOwners,
    String registrationNumber,
    LocalDate insuranceValidity,
    @NotBlank String location,
    String description,
    List<String> photos,
    String video,
    List<String> features,
    @NotNull CarStatus status,
    @NotNull CarCondition condition
) {}
