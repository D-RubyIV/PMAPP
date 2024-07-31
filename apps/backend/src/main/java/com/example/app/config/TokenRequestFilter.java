package com.example.app.config;


import com.example.app.common.Provider;
import com.example.app.model.UserEntity;
import com.example.app.repository.UserRepository;
import com.example.app.service.TokenService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
public class TokenRequestFilter extends OncePerRequestFilter {
    @Autowired
    private TokenService tokenService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HandlerExceptionResolver handlerExceptionResolver;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String myAuthorization = request.getHeader("Authorization");
        if (!(myAuthorization != null && myAuthorization.startsWith("Bearer"))) {
            log.debug("NOT HAVE AUTHORIZATION");
            filterChain.doFilter(request, response);
            return;
        }
        String tokenClient = myAuthorization.split(" ")[1].trim();

        try {
            if (tokenService.extractUsername(tokenClient) == null) {
                log.debug("TOKEN NULL");
                filterChain.doFilter(request, response);
                return;
            }
            String email = tokenService.extractUsername(tokenClient);
            Map<String, Object> map = tokenService.getMapClaimsFromToken(tokenClient);
            String providerString = (String) map.get("provider");
            Provider provider = Provider.valueOf(providerString);
            UserEntity userModel = userRepository.findByEmailAndProvider(email, provider);
            if (userModel == null) {
                log.debug("USER NOT FOUND");
                filterChain.doFilter(request, response);
                return;
            }
            setAuthenticationContext(userModel, request);
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            log.debug("Expired jwt credentials");
            throw new CredentialsExpiredException("Expired jwt credentials");

        } catch (Exception ex) {
            log.debug("Exception");
            handlerExceptionResolver.resolveException(request, response, null, ex);
        }

    }

    private void setAuthenticationContext(UserDetails userDetails, HttpServletRequest request) {
        log.info(String.format("REQUESTS FROM USER: %s", userDetails.getUsername()));
        UsernamePasswordAuthenticationToken
                authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities());
        authentication.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}