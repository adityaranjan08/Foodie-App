package com.niit.authorization.service;

import com.niit.authorization.entity.User;
import com.niit.authorization.repository.UserRepository;
import com.niit.authorization.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     *
     * @param user
     * @return user
     */
    public User registerUser(User user){
        return userRepository.save(user);
    }

    /**
     *
     * @param email
     * @param password
     * @return user
     * @throws UserNotFoundException
     */
    public User findByUsernameAndPasswordCheck(String email,String password) throws UserNotFoundException {
        User user = userRepository.findByEmailAndPwd(email,password);
        if(user==null){
            throw new UserNotFoundException();
        }
        return user;
    }

    /**
     *
     * @return list of Users
     */
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
}
