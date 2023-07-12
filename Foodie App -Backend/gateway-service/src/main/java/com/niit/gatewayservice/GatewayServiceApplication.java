package com.niit.gatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@EnableEurekaClient
@Configuration
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}

	/**
	 *
	 * @param routeLocatorBuilder
	 * @return Routelocator
	 */
	@Bean
	public RouteLocator myRoutes(RouteLocatorBuilder routeLocatorBuilder) {
		return routeLocatorBuilder.routes()
				.route(p->p.path("/api/v1/**").uri("lb://admin-service"))
				.route(p->p.path("/api/v2/**").uri("lb://authorization-service"))
				.route(p->p.path("/api/v3/**").uri("lb://customer-service"))
				.route(p->p.path("/api/v4/**").uri("lb://favourite-service"))
				.route(p->p.path("/api/v6/**").uri("lb://search-service"))
				.build();
	}

}
