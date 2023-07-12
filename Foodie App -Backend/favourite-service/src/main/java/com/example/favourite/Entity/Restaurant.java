package com.example.favourite.Entity;


import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Restaurant {

    @Id
    private String restaurantId;
    private String restaurantName;
    private Address address;
    private String type;
    private List<Cuisines> cuisines;
    private float rating;
    private String image;
}
