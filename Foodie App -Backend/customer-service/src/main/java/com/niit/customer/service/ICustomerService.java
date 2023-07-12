package com.niit.customer.service;

import com.niit.customer.model.Customer;
import com.niit.customer.exception.CustomerAlreadyExist;

public interface ICustomerService {
   public Customer registerCustomer(Customer customer) throws CustomerAlreadyExist;
   public Customer getCustomerDetail(String email);
   public Customer editCustomerDetail(Customer customer);
}
