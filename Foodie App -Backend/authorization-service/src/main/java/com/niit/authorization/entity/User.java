package com.niit.authorization.entity;

import com.niit.authorization.model.Role;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    @Id
    private String email;
    private String pwd;
    private String mobileNumber;
    private Role roles;
    @Column(length = 100000)
    private byte[] image;

}
