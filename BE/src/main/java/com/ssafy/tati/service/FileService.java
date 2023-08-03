package com.ssafy.tati.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

    String uploadFile(MultipartFile multipartFile) throws IOException;

    //void deleteFile(String fileName);

    byte[] downloadFile(String fileName) throws IOException;

}
