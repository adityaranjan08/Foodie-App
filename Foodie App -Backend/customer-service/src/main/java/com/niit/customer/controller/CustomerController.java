package com.niit.customer.controller;

import com.google.gson.Gson;
import com.niit.customer.model.Customer;
import com.niit.customer.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v3/")
public class CustomerController
{
    @Autowired
    private ICustomerService iCustomerService;
    private ResponseEntity responseEntity;

    /**
     *
     * @param user
     * @param multipartFile
     * @return ResponseEntity of Customer
     */
    @PostMapping("/registerCustomer")
    public ResponseEntity<?> register(@RequestParam("user") String user, @RequestParam("image") MultipartFile multipartFile)
    {

        try{
            Gson gson = new Gson();
            Customer saveCustomer = gson.fromJson(user, Customer.class);
            saveCustomer.setImage(multipartFile.getBytes());

            responseEntity=new ResponseEntity<Customer>(iCustomerService.registerCustomer(saveCustomer), HttpStatus.CREATED);
            System.out.println("*****Customer Controller***** ");

        }
        catch (Exception e)
        {
            responseEntity=new ResponseEntity<String>("Not registered", HttpStatus.INTERNAL_SERVER_ERROR);
            System.out.println("exception1  "+e);
        }
        return responseEntity;
    }

    /**
     *
     * @param customer
     * @return ResponseEntity of Customer
     */
    @PutMapping("/edit")
    public ResponseEntity<Customer> editCustomerDetails(@RequestBody Customer customer)
    {
        responseEntity=new ResponseEntity<Customer>(iCustomerService.editCustomerDetail(customer), HttpStatus.CREATED);
        return responseEntity;
    }
    @GetMapping("/{email}/city")
    public ResponseEntity<Customer> getCustomerDetails(@PathVariable String email)
    {
        responseEntity=new ResponseEntity<Customer>(iCustomerService.getCustomerDetail(email),HttpStatus.OK);
        return responseEntity;
    }

}
