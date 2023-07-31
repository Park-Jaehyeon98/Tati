package com.ssafy.tati.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.tati.dao.RedisDao;
import com.ssafy.tati.entity.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Duration;
import java.util.*;

@RequiredArgsConstructor
@Component
public class JwtTokenizer {
    private final RedisDao redisDao;

    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

    // Plain Text 형태인 Secret Key의 byte[]를 Base64 형식의 문자열로 인코딩, Plain Text 자체를 SecretKey 설정은 권장X
    public String encodedBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    //JWT 토큰 이용자에게 최초 발급하기 위한 jwt 생성 메서드
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey) {

        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    //AccessToken 만료시 재발급하기 위한 RefreshToken 생성 메서드
    public String generateRefreshToken(String subject, Date expiration, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    // Jwt 사용자 정보
    public Jws<Claims> getClaims(String jws) {

        Key key = getKeyFromBase64EncodedKey(encodedBase64SecretKey(secretKey));

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);

        return claims;
    }

    public String getSubject(String jws) {
        Key key = getKeyFromBase64EncodedKey(encodedBase64SecretKey(secretKey));

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws)
                .getBody()
                .getSubject();

    }

    //jwt 위변조 검증
    public void verifySignature(String jws, String base64EncodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJwt(jws);

    }

    //토큰 만료 기간
    public Date getTokenExpiration(int expirationMinutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }

    //jwt에 서명할 secretKey 생성
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberName", member.getMemberName());
        claims.put("memberId", member.getMemberId());

        String subject = member.getEmail();
        Date expiration = getTokenExpiration(accessTokenExpirationMinutes);
        String base64EncodedSecretKey = encodedBase64SecretKey(secretKey);

        return generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);
    }

    private String delegateRefreshToken(Member member) {
        String subject = member.getEmail();
        Date expiration = getTokenExpiration(refreshTokenExpirationMinutes);
        String base64EncodedSecretKey = encodedBase64SecretKey(secretKey);

        return generateRefreshToken(subject, expiration, base64EncodedSecretKey);
    }

    public Token createTokensByLogin(Member member) {
        String atk = delegateAccessToken(member);
        String rtk = delegateRefreshToken(member);
        redisDao.setValues(member.getEmail(), rtk, Duration.ofMinutes((long) refreshTokenExpirationMinutes));
        return new Token(atk, rtk);
    }

    public Token reissueAccessToken(Member member) throws JwtException {
        String rtkInRedis = redisDao.getValues(member.getEmail());
        if (Objects.isNull(rtkInRedis)) {
            throw new JwtException("인증 정보가 만료되었습니다.");
        }

        String atk = delegateAccessToken(member);
        return new Token(atk, null);
    }

    public void deleteRefreshToken(Member member) throws JwtException {
        redisDao.deleteValues(member.getEmail());
    }

    public void setBlackListAccessToken(String bearerAtk) {
        String acToken = bearerAtk.substring(7);
        long expiration = getClaims(acToken).getBody().getExpiration().getTime();
        long now = Calendar.getInstance().getTime().getTime();

        redisDao.setValues(acToken, "logout", Duration.ofMillis(expiration - now));
    }

    public boolean isBlackList(String atk) {
        return StringUtils.hasText(redisDao.getValues(atk));
    }
}
