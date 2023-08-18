package com.ssafy.tati.config;

import com.ssafy.tati.auth.JwtAuthenticationFilter;
import com.ssafy.tati.auth.JwtTokenizer;
import com.ssafy.tati.auth.MemberDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenizer jwtTokenizer;
    private final MemberDetailsService memberDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/member/sign-up", "/member/nickname-check", "/member/email-check", "/member/email-code-check", "/member/login", "/member/find-password").permitAll()
                .antMatchers(HttpMethod.GET, "/notice", "/notice/{boardId}", "/faq", "/faq/{boardId}", "/study/list", "/study/search").permitAll()
                .anyRequest().authenticated()
//                .anyRequest().permitAll()
                .and()
                .addFilterBefore(new JwtAuthenticationFilter(jwtTokenizer, memberDetailsService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // 모든 출처에 대해 HTTP 통신을 허용
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS")); //파라미터로 지정한 HTTP Method에 대한 HTTP 통신을 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 URL 앞에서 구성한 CORS 정책을 적용
        return source;
    }
}