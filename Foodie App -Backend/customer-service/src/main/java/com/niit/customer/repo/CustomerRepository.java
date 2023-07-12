package com.niit.customer.repo;

import com.niit.customer.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends MongoRepository<Customer,String> {
    /**
     *
     * @param customer
     * @return Customer
     */
    public Customer save(Customer customer);

    /**
     *
     * @param customerEmailId
     * @return Customer
     */
    public Customer findByCustomerEmailId(String customerEmailId);


}
