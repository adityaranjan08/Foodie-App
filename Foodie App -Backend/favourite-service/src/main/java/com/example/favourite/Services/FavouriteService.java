package com.example.favourite.Services;

import com.example.favourite.Entity.Cuisines;
import com.example.favourite.Entity.Customer;
import com.example.favourite.Entity.Restaurant;
import com.example.favourite.Repository.FavouriteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class FavouriteService implements IFavouriteService{

    @Autowired
    FavouriteRepository favouriteRepository;

    @Override
    public List<Restaurant> saveRestaurantToFav(Restaurant restaurant ,String email)
    {
        List<Restaurant> favRestauant= new ArrayList<>();
        Customer customer= favouriteRepository.findByEmail(email);
        favRestauant=customer.getRestaurants();
        favRestauant.add(restaurant);
        customer.setRestaurants(favRestauant);
        return favouriteRepository.save(customer).getRestaurants();

    }

    @Override
    public String saveCusineToFav(Restaurant restaurant, String email)
    {
        int flag =0;
        List<Cuisines> favCuisines= new ArrayList<>();
        Customer customer=favouriteRepository.findByEmail(email);
        if(customer!=null) {
            List<Restaurant> restaurants = customer.getRestaurants();
            for (Restaurant rest : restaurants) {
                if (rest.getRestaurantId().equalsIgnoreCase(restaurant.getRestaurantId())) {
                    favCuisines = rest.getCuisines();
                    favCuisines.add(restaurant.getCuisines().get(0));
                    rest.setCuisines(favCuisines);
                    flag =1;
                }
            }
            if(flag == 0)
            restaurants.add(restaurant);
            customer.setRestaurants(restaurants);
            favouriteRepository.save(customer);
        } else {
            favouriteRepository.save(new Customer(email, Collections.singletonList(restaurant)));
        }
        return "Added";
    }

    @Override
    public List<Restaurant> getFavorite(String email) {
        Customer c = favouriteRepository.findByEmail(email);
        if(c == null)
            return null;
        else return c.getRestaurants();
    }
    public List<Restaurant> deleteCuisineFromFav(String restaurantId, String email, String cuisineName) {
        Customer customer = favouriteRepository.findByEmail(email);
        List<Restaurant> res = customer.getRestaurants();
        List<Restaurant> newRes = new ArrayList<>();
        int flag = 0;
        for(Restaurant r: res) {
            flag =0;
            List<Cuisines> newCuisine = new ArrayList<>();
            if (r.getRestaurantId().equalsIgnoreCase(restaurantId)) {
                flag = 1;
                for (Cuisines c : r.getCuisines()) {
                    if (!c.getCuisineName().trim().equalsIgnoreCase(cuisineName))
                        newCuisine.add(c);
                }
            }
            if(!newCuisine.isEmpty()) {
                r.setCuisines(newCuisine);
                newRes.add(r);
            }
            if( flag == 0 ) {
                newRes.add(r);
            }
        }
        if(!newRes.isEmpty())
        favouriteRepository.save(new Customer(email, newRes));
        else favouriteRepository.delete(new Customer(email, res));
        return newRes;
    }

}
