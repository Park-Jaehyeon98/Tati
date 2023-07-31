package com.ssafy.tati.Exception;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;
import java.io.UnsupportedEncodingException;


@ControllerAdvice
@RestController
public class ExceptionHandlerController {

    //데이터가 존재하지 않을 때
    @ExceptionHandler(value = DataNotFoundException.class)
    public ResponseEntity<?> DataNotFoundExceptionHandler(DataNotFoundException e){
        return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST );
    }

    //중복된 데이터일 때
    @ExceptionHandler(value = DuplicateKeyException.class)
    public ResponseEntity<?> DuplicateKeyExceptionHandler(DuplicateKeyException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //잘못된 데이터 값이 입력될 때
    @ExceptionHandler(value = MismatchDataException.class)
    public ResponseEntity<?> MismatchDataExceptionHandler(MismatchDataException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //메일 관련 예외
    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<?> MessagingExceptionHandler(MessagingException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //인코딩 관련 예외
    public ResponseEntity<?> UnsupportedEncodingExceptionHandler(UnsupportedEncodingException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
