package com.niit.SearchService.Entity;


import lombok.*;
import org.springframework.data.annotation.Id;

import java.util.List;

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
