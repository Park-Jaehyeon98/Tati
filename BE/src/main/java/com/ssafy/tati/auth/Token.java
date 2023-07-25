package com.ssafy.tati.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class Token {
    private String accessToken;
    private String refreshToken;
}
