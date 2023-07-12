package com.niit.SearchService.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason = "Resturant for given City is not available")
public class RestaurantNotFoundException extends Exception{
}
