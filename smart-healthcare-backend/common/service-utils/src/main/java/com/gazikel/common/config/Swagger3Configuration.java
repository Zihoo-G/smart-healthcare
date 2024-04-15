package com.gazikel.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Swagger3Configuration {
    @Bean
    public GroupedOpenApi DrugApi() {
        return GroupedOpenApi.builder().group("药物接口").pathsToMatch("/sys/drug/**").build();
    }

    @Bean
    public GroupedOpenApi HospitalApi() {
        return GroupedOpenApi.builder().group("医院管理接口").pathsToMatch("/sys/hospital/**").build();
    }

    @Bean
    public OpenAPI docsOpenApi() {
        return new OpenAPI()
                .info(new Info().title("智慧医疗服务系统")
                        .description("通用设计接口")
                        .version("1.0.0"));

    }


}
