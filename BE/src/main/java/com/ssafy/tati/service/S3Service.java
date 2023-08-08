package com.ssafy.tati.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class S3Service implements FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public String uploadFile(MultipartFile multipartFile) throws IOException{
        String s3FileName = UUID.randomUUID() +"_"+ multipartFile.getOriginalFilename();

        ObjectMetadata objMeta = new ObjectMetadata();
        objMeta.setContentLength(multipartFile.getInputStream().available());
        amazonS3.putObject(bucket, s3FileName, multipartFile.getInputStream(), objMeta);

        return amazonS3.getUrl(bucket, s3FileName).toString();
    }

    @Override
    public byte[] downloadFile(String fileName) throws IOException {

        String originalFileName = createOriginal(fileName);

        System.out.println("service ImgName : " +originalFileName);
        validateFileExists(originalFileName);

        S3Object s3Object = amazonS3.getObject(bucket, originalFileName);
        S3ObjectInputStream s3ObjectContent = s3Object.getObjectContent();

        return IOUtils.toByteArray(s3ObjectContent);
    }

//    @Override
//    public byte[] downloadFile(String fileName) throws IOException {
//        System.out.println("service ImgName: " + fileName);
//        validateFileExists(fileName);
//
//        S3Object s3Object = amazonS3.getObject(bucket, fileName); // Use the original file name
//        S3ObjectInputStream s3ObjectContent = s3Object.getObjectContent();
//
//        return IOUtils.toByteArray(s3ObjectContent);
//    }



    @Override
    public void deleteFile(String fileName) {
        String originalFileName = createOriginal(fileName);
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, originalFileName));
    }

    private void validateFileExists(String fileName) throws FileNotFoundException {
        System.out.println("fileName : " +fileName);
        System.out.println("bucket : " +bucket);

        if(!amazonS3.doesObjectExist(bucket, fileName)) {
            System.out.println(amazonS3.doesObjectExist(bucket, fileName));
            throw new FileNotFoundException("존재하지 않는 파일입니다.");
        }
    }

    public String createOriginal(String fileName){
        String baseUrl = "https://tatibucket.s3.ap-northeast-2.amazonaws.com/";

        if (fileName.startsWith(baseUrl)) {
            return fileName.substring(baseUrl.length());
        } else {
            return fileName;
        }
    }




}
