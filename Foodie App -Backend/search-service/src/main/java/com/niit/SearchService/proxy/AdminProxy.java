package com.niit.SearchService.proxy;

import com.niit.SearchService.Entity.Restaurant;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;

@FeignClient(name = "admin-service")
public interface AdminProxy {
    @GetMapping("/api/v1/restaurants")
    public ResponseEntity<List<Restaurant>> getRestaurants();
}
