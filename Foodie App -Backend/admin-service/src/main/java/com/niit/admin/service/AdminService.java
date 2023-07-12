package com.niit.admin.service;

import com.niit.admin.entity.Admin;
import com.niit.admin.entity.Restaurant;
import com.niit.admin.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class AdminService implements IAdminService{

    @Autowired
    AdminRepository adminRepository;


    /**
     *
     * @param restaurant Restaurant object
     * @param email
     * @return List Of Restaurants and newly added restaurant
     */
    @Override
    public List<Restaurant> addRestaurant(Restaurant restaurant, String email) {
        restaurant.setRestaurantId(UUID.randomUUID());
        restaurant.getCuisines().forEach(cuisine-> cuisine.setId(UUID.randomUUID()));
        Admin newAdmin = new Admin(email, List.of(restaurant));
        Admin admin = adminRepository.findByEmail(email);
        if(admin != null)
        admin.getRestaurants().add(restaurant);
        else {
            admin = newAdmin;
        }
        return adminRepository.save(admin).getRestaurants();
    }

    /**
     *
     * @param restaurantId
     * @return String message
     */
    @Override
    public String deleteRestaurant(UUID restaurantId) {
        Admin admin = (Admin) adminRepository.findAll();
        List<Restaurant>restaurants;
        restaurants = admin.getRestaurants();
        for(Restaurant restaurant:restaurants){
            if(restaurant.getRestaurantId()==restaurantId){
                restaurants.remove(restaurant);
            }
            admin.setRestaurants(restaurants);
        }
        return "restaurant got deleted";
    }

    /**
     *
     * @return List Of Restaurant
     */
    @Override
    public List<Restaurant> getRestaurants() {
        List<Admin> admins = adminRepository.findAll();
        List<Restaurant> restaurants = new ArrayList<>();
        for (Admin admin: admins) {
            restaurants.addAll(admin.getRestaurants());
        }
        return restaurants;
    }
}
