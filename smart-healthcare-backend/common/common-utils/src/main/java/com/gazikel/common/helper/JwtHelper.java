package com.gazikel.common.helper;

import io.jsonwebtoken.*;
import org.apache.commons.lang3.StringUtils;

import java.util.Date;

public class JwtHelper {
    // 过期时间
    private static long tokenExpiration = 24 * 60 *60 * 1000;
    // 签名密钥
    private static String tokenSignKey = "123456";

    public static String createToken(Long userId, String username) {

        return Jwts.builder()
                .setSubject("smart-healthcare-user")
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpiration) )
                .claim("userId", userId)
                .claim("username", username)
                .signWith(SignatureAlgorithm.HS512, tokenSignKey)
                .compressWith(CompressionCodecs.GZIP)
                .compact();
    }

    /**
     * 根据token得到用户id
     * @param token 用户token
     * @return 用户id
     */
    public static Long getUserId(String token) {
        if (StringUtils.isEmpty(token)) {
            return null;
        }
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        Integer userId = (Integer) claims.get("userId");
        return userId.longValue();
    }

    /**
     * 根据token得到用户username
     * @param token
     * @return
     */
    public static String getUsername(String token) {
        if (StringUtils.isEmpty(token)) {
            return "";
        }
        Jws<Claims> claimsJws = Jwts.parser().setSigningKey(tokenSignKey).parseClaimsJws(token);
        Claims claims = claimsJws.getBody();
        return (String) claims.get("username");
    }
}
