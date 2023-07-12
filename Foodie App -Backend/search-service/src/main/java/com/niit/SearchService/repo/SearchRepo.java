package com.niit.SearchService.repo;


import com.niit.SearchService.Entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchRepo extends MongoRepository<Admin, String> {

}
