package com.example.favourite.Entity;


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
