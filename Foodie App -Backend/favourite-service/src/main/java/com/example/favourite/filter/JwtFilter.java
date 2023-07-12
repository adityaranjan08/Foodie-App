package com.example.favourite.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        String authenticationHeader = httpServletRequest.getHeader("authorization");

        if (httpServletRequest.getMethod().equals("OPTIONS")) {
            httpServletResponse.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } else {
            if (authenticationHeader == null || !authenticationHeader.startsWith("Bearer")) {
                throw new ServletException("Missing Or Invalid Authorization Header");
            }
        }

        final String token = authenticationHeader.substring(7);
        try {
            Claims claims = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
            httpServletRequest.setAttribute("claims", claims);
            filterChain.doFilter(httpServletRequest, httpServletResponse);
        } catch (SignatureException e) {
            ((HttpServletResponse) servletResponse).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}
