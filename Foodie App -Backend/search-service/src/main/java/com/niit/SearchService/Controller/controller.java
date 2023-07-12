package com.niit.SearchService.Controller;





import com.niit.SearchService.Entity.Cuisines;
import com.niit.SearchService.Entity.Restaurant;
import com.niit.SearchService.Exception.CuisineNotFoundException;
import com.niit.SearchService.repo.SearchRepo;
import com.niit.SearchService.service.SearchService;
import com.niit.SearchService.Exception.RestaurantNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/v6/")
public class controller {

        @Autowired
        private SearchRepo searchRepo;

        @Autowired
        private SearchService searchService;

        @GetMapping("/allRestaurants/{city}")
        public List<Restaurant> findRestaurantByCity(@PathVariable("city") String city) throws RestaurantNotFoundException
        {
           return searchService.findRestaurantByCity(city);
        }

         @GetMapping("/allRestaurants/{city}/{name}")
        public List<Cuisines> findCusineByName(@PathVariable String city , @PathVariable  String name)throws CuisineNotFoundException
        {
                return searchService.findCuisineByName(name,city);
        }

}
