package com.niit.SearchService.service;




import com.niit.SearchService.Entity.Cuisines;
import com.niit.SearchService.Entity.Restaurant;
import com.niit.SearchService.Exception.CuisineNotFoundException;
import com.niit.SearchService.Exception.RestaurantNotFoundException;

import java.util.List;


public interface SearchService {

    List<Restaurant> findRestaurantByCity(String city) throws RestaurantNotFoundException;
    List<Cuisines> findCuisineByName(String cuisineName, String city) throws CuisineNotFoundException;
}
