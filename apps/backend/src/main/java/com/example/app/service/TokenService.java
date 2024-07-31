package com.example.app.service;

import com.example.app.model.UserEntity;
import com.example.app.repository.UserRepository;
import com.example.app.response.TokenResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class TokenService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;
    @Value("${security.jwt.expiration-long}")
    private int expiration_long;
    @Value("${security.jwt.expiration-short}")
    private int expiration_short;
    @Autowired
    private UserRepository userRepository;

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public String extractIssuer(String token) {
        return extractClaim(token, Claims::getIssuer);
    }

    public Map<String, Object> getMapClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(getSignInKey()).build().parseClaimsJws(token).getBody();
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserEntity userModel,
            long expiration
    ) {
        return Jwts
                .builder()
                .setIssuer(userModel.getProvider().toString())
                .setClaims(extraClaims)
                .setSubject(userModel.getEmail())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateAccessToken(UserEntity userModel) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("provider", userModel.getProvider());
        extraClaims.put("role", userModel.getRole().name());
        String token = buildToken(extraClaims, userModel, expiration_short);
        userRepository.save(userModel);
        return token;
    }

    public String generateRefreshToken(UserEntity userModel) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("provider", userModel.getProvider());
        extraClaims.put("role", userModel.getRole().name());
        String token = buildToken(extraClaims, userModel, expiration_long);
        userRepository.save(userModel);
        return token;
    }
    public TokenResponse generate(UserEntity userModel){
        TokenResponse tokenResponse = new TokenResponse();
        tokenResponse.setAccessToken(generateAccessToken(userModel));
        tokenResponse.setRefreshToken(generateRefreshToken(userModel));
        tokenResponse.setExpiration(expiration_long);
        return tokenResponse;
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
