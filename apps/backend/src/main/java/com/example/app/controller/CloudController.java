package com.example.app.controller;

import com.amazonaws.HttpMethod;
import com.example.app.service.CloudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("api/cloud")
public class CloudController {
    @Autowired
    private CloudService cloudService;

    @Value("${spring.cloud.aws.bucket.name}")
    private String bucketName;

    @GetMapping("")
    public ResponseEntity<?> findALl() {
        return ResponseEntity.ok(cloudService.findAllObjects());
    }

    @PostMapping("/gifs")
    public ResponseEntity<?> uploadGif(
            @RequestParam("gifFile") MultipartFile gifFile,
            Authentication authentication,
            @RequestParam("title") String title
    ) throws IOException {
        String url = cloudService.uploadFile(gifFile, UUID.randomUUID() + gifFile.getOriginalFilename());
        Map<String, String> map = new HashMap<>();
        map.put("created", url);
        return ResponseEntity.ok().body(map);
    }

    @GetMapping("/generate-url")
    public ResponseEntity<?> generateUrl(@RequestParam String file) {
        return ResponseEntity.ok(cloudService.generatorPreSignedUrl(file, bucketName, HttpMethod.GET));
    }
}