package com.niit.admin.service;

import com.niit.admin.entity.Restaurant;

import java.util.List;
import java.util.UUID;

public interface IAdminService {

    /**
     * Add restaurant
     * @param restaurant Restaurant object
     * @return list of restaurants
     */
    public List<Restaurant> addRestaurant(Restaurant restaurant, String email);

    /**
     *
     * @param restaurantId
     * @return String message
     */
    public String deleteRestaurant(UUID restaurantId);

    /**
     * Get all restaurants added by admins
     * @return List of Restaurants
     */
    public List<Restaurant> getRestaurants();

}
