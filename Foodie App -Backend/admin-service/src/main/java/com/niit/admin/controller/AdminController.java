package com.niit.admin.controller;

import com.niit.admin.service.AdminService;
import com.niit.admin.entity.Restaurant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/")
public class AdminController {

    @Autowired
    AdminService adminService;

    /**
     * admin adding restaurants in the dashboard
     * @param email
     * @param restaurant
     * @return ResponseEntity of list of restaurant
     */
    @PostMapping("/admin/{email}/restaurant")
    public ResponseEntity<List<Restaurant>> addRestaurant(@PathVariable String email, @RequestBody Restaurant restaurant){
        return new ResponseEntity<List<Restaurant>>(adminService.addRestaurant(restaurant, email), HttpStatus.CREATED);
    }

    /**
     *
     * @param email
     * @param restaurantId
     * @return Response message
     */
    @DeleteMapping("/admin/{email}/restaurant")
    public ResponseEntity<?> deleteRestaurant (@PathVariable String email, @RequestParam UUID restaurantId) {
        return new ResponseEntity<>(adminService.deleteRestaurant(restaurantId),HttpStatus.OK);
    }

    /**
     * Get all restaurants added by admins
     * @return ResponseEntity of list of Restaurants
     */
    @GetMapping("/restaurants")
    public ResponseEntity<?> getRestaurants () {
        return new ResponseEntity<>(adminService.getRestaurants(),HttpStatus.OK);
    }



}
