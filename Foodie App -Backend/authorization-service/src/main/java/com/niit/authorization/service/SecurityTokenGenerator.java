package com.niit.authorization.service;

import com.niit.authorization.entity.User;

import java.util.Map;

public interface SecurityTokenGenerator {
    /**
     *
     * @param user
     * @return Map of
     */
    Map<String,String> generateToken(User user);
}
