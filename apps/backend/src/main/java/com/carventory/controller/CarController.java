package com.carventory.controller;

import com.carventory.dto.CarRequest;
import com.carventory.dto.CarResponse;
import com.carventory.service.CarService;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    @GetMapping
    public List<CarResponse> findAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String condition,
            @RequestParam(required = false) String fuel,
            @RequestParam(required = false) String transmission,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        return service.findAll(search, condition, fuel, transmission, status, minPrice, maxPrice);
    }

    @GetMapping("/{id}")
    public CarResponse findById(@PathVariable String id) {
        return service.findById(id);
    }

    @PostMapping
    public ResponseEntity<CarResponse> create(@Valid @RequestBody CarRequest request) {
        CarResponse created = service.create(request);
        return ResponseEntity.created(URI.create("/api/cars/" + created.id())).body(created);
    }

    @PutMapping("/{id}")
    public CarResponse update(@PathVariable String id, @Valid @RequestBody CarRequest request) {
        return service.update(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
