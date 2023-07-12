package com.niit.authorization.service;

import com.niit.authorization.entity.User;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Component
public class JwtSecurityTokenGen implements SecurityTokenGenerator{
    /**
     *
     * @param user
     * @return Map of token
     */
    @Override
    public Map<String, String> generateToken(User user) {
        String jsonWebToken = null;

        JwtBuilder jwtBuilder = Jwts.builder();
        jsonWebToken = jwtBuilder.setSubject(user.getEmail()).claim("role", user.getRoles()).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS256,"secret").compact();

        Map<String,String> tokenMap = new HashMap<String,String>();
        tokenMap.put("token",jsonWebToken);
        tokenMap.put("message","User Successfully loggedIn");

        return tokenMap;
    }
}
