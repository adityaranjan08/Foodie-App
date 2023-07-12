package com.niit.SearchService.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.NOT_FOUND,reason = "Cuisine with given name is not available")
public class CuisineNotFoundException extends Exception{
}
