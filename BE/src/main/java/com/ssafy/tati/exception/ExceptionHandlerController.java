package com.ssafy.tati.exception;

import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import javax.mail.MessagingException;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UncheckedIOException;
import java.io.UnsupportedEncodingException;


@ControllerAdvice
@RestController
public class ExceptionHandlerController {

    //데이터가 존재하지 않을 때
    @ExceptionHandler(value = DataNotFoundException.class)
    public ResponseEntity<?> dataNotFoundExceptionHandler(DataNotFoundException e){
        return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST );
    }

    //중복된 데이터일 때
    @ExceptionHandler(value = DuplicateKeyException.class)
    public ResponseEntity<?> duplicateKeyExceptionHandler(DuplicateKeyException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //잘못된 데이터 값이 입력될 때
    @ExceptionHandler(value = MismatchDataException.class)
    public ResponseEntity<?> mismatchDataExceptionHandler(MismatchDataException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //메일 관련 예외
    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<?> messagingExceptionHandler(MessagingException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //인코딩 관련 예외
    @ExceptionHandler(UnsupportedEncodingException.class)
    public ResponseEntity<?> unsupportedEncodingExceptionHandler(UnsupportedEncodingException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //인출관련 예외
    @ExceptionHandler(PointException.class)
    public ResponseEntity<?> pointExceptionHandler(PointException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //파일 다운로드 관련 에외
    @ExceptionHandler(FileDownloadFailedException.class)
    public ResponseEntity<?> fileDownloadFailedExceptionHandler(FileDownloadFailedException e){
        return new ResponseEntity<>("파일 다운로드에 실패했습니다." +e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //존재하지 않는 파일 예외
    @ExceptionHandler(FileNotFoundException.class)
    public ResponseEntity<?> fileNotFoundExceptionHandler(FileNotFoundException e){
        return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //파일 형식 예외
    @ExceptionHandler(StringIndexOutOfBoundsException.class)
    public ResponseEntity<?> stringIndexOutOfBoundsExceptionHandler(StringIndexOutOfBoundsException e){
        return new ResponseEntity<>("잘못된 형식의 파일입니다 : " + e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    //파일 변환 예외
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> illegalArgumentExceptionHandler(IllegalArgumentException e){
        return new ResponseEntity<>("파일 변환 중 에러가 발생했습니다 : " +e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    //파일 사이즈 예외
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> maxUploadSizeExceededExceptionHandler(MaxUploadSizeExceededException e){
        return new ResponseEntity<>("파일 용량이 초과되었습니다 : " +e.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UncheckedIOException.class)
    public void uncheckedIOException(UncheckedIOException e){
    }

    //예외
    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> ioexceptionHandler(IOException e){
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }



}
