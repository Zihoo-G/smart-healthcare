package com.gazikel.hospital.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String uploadAvatar(MultipartFile multipartFile);
}
