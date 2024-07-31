package com.example.app.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private TokenRequestFilter jwtFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity, HandlerMappingIntrospector handlerMappingIntrospector) throws Exception {
        httpSecurity.sessionManagement(ss -> ss.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        httpSecurity.csrf(AbstractHttpConfigurer::disable);
        httpSecurity.cors(AbstractHttpConfigurer::disable);
        MvcRequestMatcher.Builder mvcMatcherBuilder = new MvcRequestMatcher.Builder(handlerMappingIntrospector);
        httpSecurity
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(
                        authorize -> authorize
                                .requestMatchers(mvcMatcherBuilder.pattern("ws/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/ws/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/auth/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/oauth/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/files/download/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/storage")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/storage/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/products")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/products/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/product-details/product/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/cart-details/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/carts/me")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/comment/product/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/collections/**")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/common/me/cart/items")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/vouchers")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/categories")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/cloud/generate-url")).permitAll()
                                .requestMatchers(mvcMatcherBuilder.pattern("api/manage/**")).hasAnyAuthority("Admin")
                                .anyRequest().authenticated()
                );
        httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        httpSecurity.exceptionHandling(ex -> {
            ex.authenticationEntryPoint((request, response, authException) -> response.sendError(401, "Unauthorized"));
            ex.accessDeniedHandler((request, response, authException) -> response.sendError(403, "Forbidden"));
        });
        return httpSecurity.build();
    }
}