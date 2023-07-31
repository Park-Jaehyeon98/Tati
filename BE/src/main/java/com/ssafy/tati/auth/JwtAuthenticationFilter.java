package com.ssafy.tati.auth;

import io.jsonwebtoken.JwtException;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberDetailsService memberDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = request.getHeader("Authorization");
        String refreshToken = request.getHeader("RefreshToken");
        String requestURI = request.getRequestURI();

        if ((!Objects.isNull(accessToken) && accessToken.startsWith("Bearer ")) || requestURI.equals("/member/reissue")) {
            try {
                if (requestURI.equals("/member/reissue")) {
                    String rtkSubject = jwtTokenizer.getSubject(refreshToken);
                    UserDetails userDetails = memberDetailsService.loadUserByUsername(rtkSubject);
                    Authentication token = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(token);
                }
                else {
                    String atk = accessToken.substring(7);
                    String atkSubject = jwtTokenizer.getSubject(atk);

                    if (jwtTokenizer.isBlackList(atk)) {
                        throw new JwtException("유효하지 않은 AccessToken 입니다.");
                    }

                    UserDetails userDetails = memberDetailsService.loadUserByUsername(atkSubject);
                    Authentication token = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(token);
                }
            } catch (JwtException e) {
                request.setAttribute("exception", e.getMessage());
            }
        }
        filterChain.doFilter(request, response);
    }
}
