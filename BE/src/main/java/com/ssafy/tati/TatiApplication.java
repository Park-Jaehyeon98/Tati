package com.ssafy.tati;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TatiApplication {

	public static void main(String[] args) {
		SpringApplication.run(TatiApplication.class, args);
	}

}
