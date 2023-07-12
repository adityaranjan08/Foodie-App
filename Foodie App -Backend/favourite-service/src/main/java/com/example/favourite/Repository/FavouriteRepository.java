package com.example.favourite.Repository;


import com.example.favourite.Entity.Customer;
import com.example.favourite.Entity.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FavouriteRepository extends MongoRepository<Customer,String> {

    public Customer findByEmail(String email);

}
