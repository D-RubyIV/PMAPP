package com.example.app.controller;

import com.amazonaws.HttpMethod;
import com.example.app.model.MediaEntity;
import com.example.app.repository.MediaRepository;
import com.example.app.service.CloudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/media")
public class MediaController {
    @Value("${spring.cloud.aws.bucket.name}")
    private String bucketName;

    @Autowired
    private CloudService cloudService;

    @Autowired
    private MediaRepository mediaRepository;

    @GetMapping()
    public ResponseEntity<?> detail(@RequestParam String name) {
        Map<String, String> map = new HashMap<>();
        MediaEntity mediaModel = mediaRepository.findByName(name).orElse(null);
        if (mediaModel != null){
            String url = cloudService.generatorPreSignedUrl(name, bucketName, HttpMethod.GET);
            map.put("url", url);
        }
        return ResponseEntity.ok(map);
    }
}
