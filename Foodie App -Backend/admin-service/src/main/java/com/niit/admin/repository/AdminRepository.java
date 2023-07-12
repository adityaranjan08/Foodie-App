package com.niit.admin.repository;


import com.niit.admin.entity.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin,String> {


     /**
      *
      * @param email
      * @return admin
      */
     Admin findByEmail(String email);
}
