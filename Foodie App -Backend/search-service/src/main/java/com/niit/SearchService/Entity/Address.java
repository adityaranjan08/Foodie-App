package com.niit.SearchService.Entity;


import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Address {

    String city;
    String street;
    int zipCode;
}
