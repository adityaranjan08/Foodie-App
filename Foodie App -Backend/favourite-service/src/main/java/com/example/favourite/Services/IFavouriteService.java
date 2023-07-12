package com.example.favourite.Services;


import com.example.favourite.Entity.Cuisines;
import com.example.favourite.Entity.Restaurant;

import java.util.List;


public interface IFavouriteService {

    public List<Restaurant> saveRestaurantToFav(Restaurant restaurant,String email);
    public String saveCusineToFav(Restaurant restaurant, String email);
    List<Restaurant> getFavorite(String email);
    public List<Restaurant> deleteCuisineFromFav(String restaurantId,String email,String cuisineName);
}
