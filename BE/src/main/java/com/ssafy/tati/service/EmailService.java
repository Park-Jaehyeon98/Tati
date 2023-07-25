package com.ssafy.tati.service;

import com.ssafy.tati.dao.RedisDao;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.util.Objects;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final RedisDao redisDao;

    public void sendAuthMail(String to) throws MessagingException, UnsupportedEncodingException {
        String authCode = createKey();
        String content = signupContent(authCode);
        MimeMessage message = createMessage(to, content);
        message.setSubject("타티(tati) 회원가입 인증 이메일");
        mailSender.send(message);

        redisDao.setValues(authCode, to, Duration.ofMinutes(5));
    }

    public String sendPasswordMail(String to) throws MessagingException, UnsupportedEncodingException {
        String password = createPassword();
        String content = passwordFindContent(password);
        MimeMessage message = createMessage(to, content);
        message.setSubject("타티(tati) 임시 비밀번호 발급 이메일");
        mailSender.send(message);

        return password;
    }

    public void verifyAuthCode(String email, String authCode) {
        String authCodeInRedis = redisDao.getValues(authCode);
        if (Objects.isNull(authCodeInRedis) || !authCodeInRedis.equals(email)) {
            throw new RuntimeException("인증코드가 일치하지 않습니다.");
        }
    }

    private MimeMessage createMessage(String to, String content) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, to);

        message.setText(content, "utf-8", "html");
        message.setFrom(new InternetAddress("ssafy9tati@gmail.com", "타티(tati)"));

        return message;
    }

    private String createKey() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());

        for (int i = 0; i < 6; i++) {
            key.append(random.nextInt(10));
        }
        return key.toString();
    }

    private String createPassword() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());

        for (int i = 0; i < 12; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0:
                    key.append((char) (random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) (random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(10));
                    break;
            }
        }
        return key.toString();
    }

    private String signupContent(String authCode) {
        String content="";
        content+= "<div style='margin:100px;'>";
        content+= "<h1> 안녕하세요. 타티(tati)입니다. </h1>";
        content+= "<br>";
        content+= "<p>아래 코드를 5분 안에 회원가입 페이지로 돌아가 입력해주세요.<p>";
        content+= "<br>";
        content+= "<p>감사합니다.<p>";
        content+= "<br>";
        content+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        content+= "<h3 style='color:blue;'>이메일 인증 코드입니다.</h3>";
        content+= "<div style='font-size:130%'>";
        content+= "CODE : <strong>";
        content+= authCode+"</strong><div><br/> ";
        content+= "</div>";

        return content;
    }

    private String passwordFindContent(String password) {
        String content="";
        content+= "<div style='margin:100px;'>";
        content+= "<h1> 안녕하세요. 타티(tati)입니다. </h1>";
        content+= "<br>";
        content+= "<p>아래 임시 비밀번호를 로그인 페이지로 돌아가 입력해주세요.<p>";
        content+= "<br>";
        content+= "<p>감사합니다.<p>";
        content+= "<br>";
        content+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
        content+= "<h3 style='color:blue;'>임시 비밀번호입니다.</h3>";
        content+= "<div style='font-size:130%'>";
        content+= "PASSWORD : <strong>";
        content+= password+"</strong><div><br/> ";
        content+= "</div>";

        return content;
    }
}
