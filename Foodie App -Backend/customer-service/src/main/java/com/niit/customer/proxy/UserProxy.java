package com.niit.customer.proxy;
import com.niit.customer.model.Customer;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "authorization-service", url = "localhost:8082")
public interface UserProxy {
    /**
     *
     * @param customer
     * @return ResponseEntity Of String
     */
    @PostMapping("/api/v2/registerCustomer")
    public ResponseEntity<String> registerCustomer(@RequestBody Customer customer);
}
