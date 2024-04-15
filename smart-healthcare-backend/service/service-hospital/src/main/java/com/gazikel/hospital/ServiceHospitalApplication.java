package com.gazikel.hospital;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.gazikel")
public class ServiceHospitalApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceHospitalApplication.class, args);
    }

}
