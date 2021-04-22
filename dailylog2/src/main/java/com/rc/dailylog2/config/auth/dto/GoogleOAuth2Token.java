package com.rc.dailylog2.config.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class GoogleOAuth2Token {
    private String redirectUri;
    private String clientId;
    private String projectId;
    private String clientSecret;

    @Builder
    public GoogleOAuth2Token(String redirectUri, String clientId, String clientSecret
            , String projectId)
    {
        this.redirectUri = redirectUri;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.projectId = projectId;

    }
}
