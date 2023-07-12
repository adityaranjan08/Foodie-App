package com.example.favourite.Entity;

import org.springframework.data.annotation.Id;

import lombok.*;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class Cuisines {


    @Id
    private String id;
    private String cuisineName;
    private String category;
    private int price;
    private float rating;
    private String image;

}
