package com.niit.admin.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Cuisines {

    private UUID id;
    private String cuisineName;
    private String category;
    private int price;
    private int rating;
    private String image;

}
