package com.rc.dailylog2.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rc.dailylog2.config.auth.dto.GoogleOAuth2Token;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.URI;

@Controller
public class GoogleOAuthController {

    private String tokenFile ="/tokens/credentials.json";

    @GetMapping("/dailylog2/google/auth")
    public void googleSignCallback(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //HTTP Request를 위한 RestTemplate

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        String code = request.getParameter("code");

        //read token
        ObjectMapper mapper = new ObjectMapper();
        GoogleOAuth2Token token = mapper.readValue(new File(tokenFile), GoogleOAuth2Token.class);

        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, Object > parameters = new LinkedMultiValueMap<>();
        parameters.add("code", code);
        parameters.add("client_id", token.getClientId());
        parameters.add("client_secret", token.getClientSecret());
        parameters.add("redirect_uri", token.getRedirectUri());
        parameters.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String,Object>> restRequest = new HttpEntity<MultiValueMap<String,Object>>(parameters,headers);

        URI uri = URI.create("https://www.googleapis.com/oauth2/v4/token");

        ResponseEntity<String> restReponse = restTemplate.postForEntity(uri,parameters,String.class);

        String bodys = restReponse.getBody();
        System.out.println("예제 테스트 ....");
        System.out.println(bodys);

        response.sendRedirect("month-one");
    }

    public void requestGoogleOAuth(HttpServletRequest request, HttpServletResponse response)throws IOException {
        String url = "https://accounts.google.com/o/oauth2/v2/auth?"
                +"client_id="
                +"&redirect_uri=http://localhost:9101/dailylog2/google/auth"
                +"&response_type=code"
                +"&scope=email%20profile%20openid"
                +"&access_type=offline";
    }

}
