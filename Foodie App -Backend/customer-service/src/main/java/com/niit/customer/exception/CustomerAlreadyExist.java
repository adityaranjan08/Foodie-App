package com.niit.customer.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code= HttpStatus.ALREADY_REPORTED, reason = "Customer already exist")
public class CustomerAlreadyExist extends Exception {
}
