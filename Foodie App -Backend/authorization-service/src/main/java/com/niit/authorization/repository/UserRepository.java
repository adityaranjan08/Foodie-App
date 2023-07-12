package com.niit.authorization.repository;

import com.niit.authorization.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface UserRepository extends JpaRepository<User,String> {

    /**
     *
     * @param email
     * @param password
     * @return user
     */
    public User findByEmailAndPwd(String email,String password);

}
