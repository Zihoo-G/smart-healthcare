package com.gazikel.hospital.utils;

import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConstantProperties implements InitializingBean {
    @Value("${aliyun.endpoint}")
    private String enpoint;
    @Value("${aliyun.access-key.id}")
    private String accessKeyId;
    @Value("${aliyun.access-key.secret}")
    private String accessKeySecret;
    @Value("${aliyun.bucket.name}")
    private String bucketName;

    public static String ENPOINT;

    public static String ACCESS_KEY_ID;

    public static String ACCESS_KEY_SECRET;

    public static String BUCKET_NAME;


    @Override
    public void afterPropertiesSet() throws Exception {
        ENPOINT = enpoint;
        ACCESS_KEY_ID = accessKeyId;
        ACCESS_KEY_SECRET = accessKeySecret;
        System.out.println("===" + bucketName);
        BUCKET_NAME = bucketName;
    }
}
