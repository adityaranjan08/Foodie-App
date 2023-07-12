package com.niit.authorization.controller;

import com.niit.authorization.entity.User;
import com.niit.authorization.model.Customer;
import com.niit.authorization.model.Role;
import com.niit.authorization.model.UserImage;
import com.niit.authorization.service.JwtSecurityTokenGen;
import com.niit.authorization.service.UserService;
import com.niit.authorization.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/")

public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    JwtSecurityTokenGen jwtSecurityTokenGen;


    /**
     *
     * @param user
     * @return ResponseEntity
     * @throws UserNotFoundException
     */
    @PostMapping("/login")
    public ResponseEntity<?> credentialCheck(@RequestBody User user) throws UserNotFoundException {
        ResponseEntity responseEntity = null;
        try{
            User user1 = userService.findByUsernameAndPasswordCheck(user.getEmail(), user.getPwd());

            if(user1.getEmail().equals(user.getEmail())) {
                Map<String,String> tokenMap = jwtSecurityTokenGen.generateToken(user1);
                tokenMap.put("email", user.getEmail());
                tokenMap.put("mobileNumber", user.getMobileNumber());
                tokenMap.put("role",user1.getRoles().name());
                if(user1.getImage()!=null){
                    Map<String,byte[]> image = Map.of("profilePic",user1.getImage());
                    responseEntity = new ResponseEntity<>(new UserImage(tokenMap,image),HttpStatus.OK);
                }else{
                    responseEntity = new ResponseEntity<>(new UserImage(tokenMap,null),HttpStatus.OK);
                }

            }else{
                responseEntity = new ResponseEntity<>("Invalid User",HttpStatus.NOT_FOUND);
            }

        } catch (UserNotFoundException ue) {
           throw ue;
        }

        return responseEntity;
    }


    /**
     *
     * @param user
     * @return ResponseEntity of User
     */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        User newUser = userService.registerUser(user);
        return new ResponseEntity<>("User Created",HttpStatus.CREATED);
    }

    /**
     *
     * @param user
     * @return Response message
     */
    @PostMapping("/registerCustomer")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer user){
        User newUser = new User(user.getCustomerEmailId(), user.getPassword(), user.getCustomerPhoneNum(), Role.CUSTOMER,user.getImage());
        userService.registerUser(newUser);
        return new ResponseEntity<>("User Created",HttpStatus.CREATED);
    }

    /**
     *
     * @return ResponseEntity of Users
     */
    @GetMapping("/Users")
    public ResponseEntity<?> getAllUsers(){
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }
}
