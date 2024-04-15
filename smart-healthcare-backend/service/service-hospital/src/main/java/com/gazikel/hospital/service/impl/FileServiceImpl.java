package com.gazikel.hospital.service.impl;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.gazikel.hospital.service.FileService;
import com.gazikel.hospital.utils.ConstantProperties;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
public class FileServiceImpl implements FileService {
    @Override
    public String uploadAvatar(MultipartFile multipartFile) {
        String endpoint = ConstantProperties.ENPOINT;
        String accessKeyId = ConstantProperties.ACCESS_KEY_ID;
        String accessKeySecret = ConstantProperties.ACCESS_KEY_SECRET;
        String bucketName = ConstantProperties.BUCKET_NAME;

        // 创建OSS Client实例
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 上传文件流
        InputStream inputStream = null;
        try {
            inputStream = multipartFile.getInputStream();
            // 调用方法实现上传
            // 生成唯一字符串
            String fileName = UUID.randomUUID().toString().replaceAll("-", "");
            System.out.println(bucketName);
            ossClient.putObject(bucketName, fileName, inputStream);

            return "https://" + bucketName + "." + endpoint + "/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭OSS Client
            ossClient.shutdown();
        }

        return null;

    }
}
