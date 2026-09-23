package com.carventory.exception;

public class CarNotFoundException extends RuntimeException {
    public CarNotFoundException(String id) {
        super("Car with id " + id + " was not found.");
    }
}
