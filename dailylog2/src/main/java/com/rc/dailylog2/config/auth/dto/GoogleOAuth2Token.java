package com.rc.dailylog2.config.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Getter
@ToString
public class GoogleOAuth2Token{
    private String redirectUri;
    private String clientId;
    private String projectId;
    private String accessToken;
    private String refreshToken;
    private String scope;
    private String tokenType;
    private String idToken;

    @Builder
    public GoogleOAuth2Token(String redirectUri, String clientId, String accessToken
            , String refreshToken, String scope, String tokenType, String idToken)
    {
        this.redirectUri = redirectUri;
        this.clientId = clientId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.scope = scope;
        this.tokenType = tokenType;
        this.idToken = idToken;
        this.projectId = projectId;

    }
}
