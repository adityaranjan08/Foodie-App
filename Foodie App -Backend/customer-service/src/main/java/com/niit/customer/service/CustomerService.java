package com.niit.customer.service;


import com.niit.customer.model.Customer;
import com.niit.customer.proxy.UserProxy;
import com.niit.customer.repo.CustomerRepository;
import com.niit.customer.exception.CustomerAlreadyExist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    UserProxy userProxy;

    /**
     *
     * @param customer
     * @return Customer
     * @throws CustomerAlreadyExist
     */
    public Customer registerCustomer(Customer customer) throws CustomerAlreadyExist {
        if(customerRepository.findById(customer.getCustomerEmailId()).isPresent()){
            throw new CustomerAlreadyExist();
        }
        System.out.println("*****saving in.....Authentication Service*****");
        userProxy.registerCustomer(customer);

        System.out.println("*****saving in......Customer Service*****");
        return customerRepository.save(customer);
    }

    /**
     *
     * @param customer
     * @return Customer
     */
    public Customer editCustomerDetail(Customer customer) {
        System.out.println("*****Customer Service editCustomerDetail***** ");
        Customer customer1=customerRepository.findByCustomerEmailId(customer.getCustomerEmailId());
        customer1.setCustomerName(customer.getCustomerName());
        customer1.setCustomerPhoneNum(customer.getCustomerPhoneNum());
        customer1.setCustomerAddress(customer.getCustomerAddress());
        return customerRepository.save(customer1);
    }
    public Customer getCustomerDetail(String email)
    {
        Customer customer1=customerRepository.findByCustomerEmailId(email);
        return customer1;
    }


}
