package com.niit.authorization.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Address {

    String city;
    String street;
    int zipCode;
}
