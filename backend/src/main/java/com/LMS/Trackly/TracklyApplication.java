package com.LMS.Trackly;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = "com.LMS.Trackly")
@EntityScan("com.LMS.Trackly.Entity")
@EnableJpaRepositories("com.LMS.Trackly.Repository")
public class TracklyApplication {

    public static void main(String[] args) {
        SpringApplication.run(TracklyApplication.class, args);
    }
}