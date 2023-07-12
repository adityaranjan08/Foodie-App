package com.niit.SearchService.Entity;

import lombok.*;
import org.springframework.data.annotation.Id;

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
