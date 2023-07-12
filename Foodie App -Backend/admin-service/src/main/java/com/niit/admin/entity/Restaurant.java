package com.niit.admin.entity;

import lombok.*;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Restaurant {
    private UUID restaurantId;
    private String restaurantName;
    private Address address;
    private String type;
    private List<Cuisines> cuisines;
    private String image;
}
