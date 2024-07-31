package com.example.app.service;


import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.util.IOUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class CloudService {
    @Value("${spring.cloud.aws.bucket.name}")
    private String bucketName;

    @Autowired
    private AmazonS3 s3Client;

    public List<S3ObjectSummary> findAllObjects(){
        ListObjectsV2Result listObjectsV2Result = s3Client.listObjectsV2(bucketName);
        List<S3ObjectSummary> contents = listObjectsV2Result.getObjectSummaries();
        System.out.println("Number of objects in the bucket: " + (long) contents.size());
        contents.forEach(System.out::println);
        return contents;
    }

    public String uploadFile(MultipartFile file, String fileName) {
        File fileObj = convertMultiPartFileToFile(file);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        fileObj.delete();
        return "File uploaded : " + fileName;
    }

    public byte[] downloadFile(String fileName) {
        S3Object s3Object = s3Client.getObject(bucketName, fileName);
        S3ObjectInputStream inputStream = s3Object.getObjectContent();
        try {
            byte[] content = IOUtils.toByteArray(inputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteFile(String fileName) {
        s3Client.deleteObject(bucketName, fileName);
        return fileName + " removed ...";
    }


    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }

    public String generatorPreSignedUrl(String filePath, String bucketName, HttpMethod httpMethod){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 10);
        return s3Client.generatePresignedUrl(bucketName, filePath, calendar.getTime(), httpMethod).toString();
    }
}