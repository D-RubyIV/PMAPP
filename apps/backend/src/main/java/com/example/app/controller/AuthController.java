package com.example.app.controller;

import com.example.app.common.Provider;
import com.example.app.model.UserEntity;
import com.example.app.repository.UserRepository;
import com.example.app.requests.SignInRequests;
import com.example.app.requests.SignUpRequests;
import com.example.app.response.TokenResponse;
import com.example.app.service.AuthService;
import com.example.app.service.TokenService;
import jakarta.validation.Valid;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private AuthService authService;
    @Value("${security.jwt.expiration-short}")
    private int expiration_short;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/login")
    public ResponseEntity<?> handleLogin(@Valid @RequestBody SignInRequests signInRequests, BindingResult bindingResult) throws BindException, BadRequestException {
        Provider provider = Provider.Local;
        if (bindingResult.hasErrors()){
            throw new BindException(bindingResult);
        }
        else {
            String email = signInRequests.getEmail();
            String password = signInRequests.getPassword();

            if (userRepository.findByEmailAndProvider(email, provider) == null){
                throw new BadRequestException("User not exist");
            } else if (userRepository.findByEmailAndProvider(email, provider) == null) {
                throw new BadRequestException("User not exist");
            } else {
                UserEntity userModelFound = userRepository.findByEmailAndProvider(email, provider);
                System.out.println(userModelFound);
                if (bCryptPasswordEncoder.matches(password, userModelFound.getPassword())){
                    TokenResponse tokenResponse = tokenService.generate(userModelFound);
                    return ResponseEntity.ok(tokenResponse);
                }
                else{
                    throw new BadRequestException("Username or password is incorrect");
                }
            }
        }
    }

    @PostMapping("/signup")
    private ResponseEntity<?> handleSignup(@Valid @RequestBody SignUpRequests signUpRequests, BindingResult bindingResult) throws Exception {
        if (bindingResult.hasErrors()) {
            throw new BindException(bindingResult);
        }
        if (userRepository.findByEmailAndProvider(signUpRequests.getEmail(), Provider.Local) != null) {
            throw new BadRequestException("Email is used");
        }
        UserEntity userModel = authService.register(signUpRequests);
        return ResponseEntity.ok(userModel);
    }

    @GetMapping("/me")
    public ResponseEntity<?> handleAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object currentUser = authentication.getPrincipal();
        System.out.println(currentUser);
        return ResponseEntity.ok(currentUser);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestParam("token") String token) {
        String username = tokenService.extractUsername(token);
        UserEntity userModel = userRepository.findByEmail(username).orElse(null);
        TokenResponse tokenResponse = new TokenResponse();
        if (userModel != null){
            tokenResponse = tokenService.generate(userModel);
        }
        return ResponseEntity.ok(tokenResponse);
    }

}
