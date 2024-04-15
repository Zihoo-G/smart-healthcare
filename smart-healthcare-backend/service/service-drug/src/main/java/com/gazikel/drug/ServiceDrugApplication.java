package com.gazikel.drug;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.gazikel")
public class ServiceDrugApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceDrugApplication.class, args);
    }
}
