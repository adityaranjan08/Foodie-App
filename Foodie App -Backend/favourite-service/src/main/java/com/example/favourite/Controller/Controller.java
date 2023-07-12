package com.example.favourite.Controller;


import com.example.favourite.Entity.Restaurant;
import com.example.favourite.Services.IFavouriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.Path;
import java.util.List;

@RestController
@RequestMapping("/api/v4/")

public class Controller {

      @Autowired
      IFavouriteService iFavouriteService;

      @PostMapping("/{email}")
      public ResponseEntity<?> addResturantToFav(@RequestBody Restaurant  restaurant, @PathVariable String email)
      {
            return new ResponseEntity<List<Restaurant>>(iFavouriteService.saveRestaurantToFav(restaurant,email), HttpStatus.OK);
      }


      @PostMapping("/{email}/cuisine")
      public ResponseEntity<?> addCuisinetoFav(@RequestBody Restaurant cuisines, @PathVariable String email)
      {
            return new ResponseEntity<String>(iFavouriteService.saveCusineToFav(cuisines,email),HttpStatus.OK);
      }

      @GetMapping("/favorite/{email}")
      public ResponseEntity<?> getFavorite(@PathVariable String email)
      {
            return new ResponseEntity<List<Restaurant>>(iFavouriteService.getFavorite(email),HttpStatus.OK);
      }

      @DeleteMapping("/{email}/{restaurantId}/{cuisineName}")
      public ResponseEntity<?> deleteCuisine(@PathVariable String restaurantId, @PathVariable String email, @PathVariable String cuisineName)
      {
           return new ResponseEntity<List<Restaurant>>(iFavouriteService.deleteCuisineFromFav(restaurantId,email,cuisineName),HttpStatus.OK);
      }
}
