package com.niit.SearchService.service;



import com.niit.SearchService.Entity.Admin;
import com.niit.SearchService.Entity.Cuisines;

import com.niit.SearchService.proxy.AdminProxy;
import com.niit.SearchService.repo.SearchRepo;
import com.niit.SearchService.Exception.CuisineNotFoundException;

import com.niit.SearchService.Entity.Restaurant;
import com.niit.SearchService.Exception.RestaurantNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class ServiceImpl implements SearchService {


    @Autowired
    SearchRepo searchRepo;
    @Autowired
    AdminProxy adminProxy;

    @Override
    public List<Restaurant> findRestaurantByCity(String city) throws RestaurantNotFoundException
    {


        List<Restaurant> restaurants =adminProxy.getRestaurants().getBody();
        List<Restaurant> searchedRest = new ArrayList<>();

        for (Restaurant restaurant : restaurants)
        {
            if (restaurant.getAddress().getCity().equalsIgnoreCase(city))
            {
                searchedRest.add(restaurant);
            }

        }
        if(searchedRest.isEmpty()){
            throw new RestaurantNotFoundException();
        }
        return searchedRest;
    }


    @Override
    public List<Cuisines> findCuisineByName(String cuisineName, String city) throws CuisineNotFoundException {

        List<Admin> admins = searchRepo.findAll();
        List<Cuisines> cuisines;
        List<Restaurant> restaurants = null;
        for(Admin admin:admins){
            restaurants.addAll(admin.getRestaurants());
        }
        List<Cuisines> cuisines2 = new ArrayList<>();
        for (Restaurant rs : restaurants)
        {
            if (rs.getAddress().getCity().equals(city))
            {
               cuisines= rs.getCuisines();

               for(Cuisines cuisines1 : cuisines)
               {
                   if(cuisines1.getCuisineName().equals(cuisineName))
                   {
                       cuisines2.add(cuisines1);
                   }
               }
            }

        }
        return cuisines2;
    }

}