package com.niit.admin.entity;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Admin {

    @Id
    private String email;
    private List<Restaurant> restaurants;
}
