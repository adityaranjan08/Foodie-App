package com.niit.authorization.model;

import lombok.*;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserImage {
    private Map<String,String> userInfo;
    private Map<String,byte[]> profilePic;

}
