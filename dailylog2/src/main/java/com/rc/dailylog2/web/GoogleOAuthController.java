package com.rc.dailylog2.web;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
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
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URI;
import java.security.GeneralSecurityException;
import java.util.*;

@Controller
public class GoogleOAuthController {

    private static final String TOKEN_FILE_PATH="/credentials.json";
    private static final String TOKEN_DIRECTORY_PATH = "/tokens";
    private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

    private static final List<String> SCOPES = Collections.singletonList(CalendarScopes.CALENDAR);


    @GetMapping("/dailylog2/google/auth2")
    public void googleSignCallback(HttpServletRequest request, HttpServletResponse response) throws IOException {

        //HTTP Request를 위한 RestTemplate
        //URL url = getClass().getResource(tokenFile);
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        String code = request.getParameter("code");

        //read token
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, Object > parameters = new LinkedMultiValueMap<>();
        parameters.add("code", code);
        parameters.add("client_id", "1069657257430-jfoqv6ue9q90osafvh09e5ga78tg9n1e.apps.googleusercontent.com");
        parameters.add("client_secret", "kCT5-IlSH8Hq6k2p8Bt6Y3t8");
        parameters.add("redirect_uri", "http://localhost:9101/dailylog2/google/auth");
        parameters.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String,Object>> restRequest = new HttpEntity<MultiValueMap<String,Object>>(parameters,headers);

        URI uri = URI.create("https://www.googleapis.com/oauth2/v4/token");

        //get access_token
        ResponseEntity<String> restReponse = restTemplate.postForEntity(uri,parameters,String.class);

        String bodys = restReponse.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String,Object> map = new HashMap<>();
        map = objectMapper.readValue(bodys, new TypeReference<Map<String, Object>>() {
        });

        //암호화해서 -> DB 저장
        GoogleOAuth2Token googleOAuth2Token = GoogleOAuth2Token.builder()
                        .accessToken((String)map.get("accessToekn"))
                        .refreshToken((String)map.get("refreshToken"))
                        .build();

        System.out.println(googleOAuth2Token.toString());
        // calendar 연동

        //response.sendRedirect("month-one");
    }

    @GetMapping("/dailylog2/google/auth")
    public void googleSignCallbackSdk() throws IOException, GeneralSecurityException {
        System.out.println("start..googleSignCallbackSdk..");
        final NetHttpTransport netHttpTransport = GoogleNetHttpTransport.newTrustedTransport();

        com.google.api.services.calendar.Calendar service =
                new Calendar.Builder(netHttpTransport,JSON_FACTORY,getCredentials(netHttpTransport))
                .setApplicationName("SPRING_BOOT")
                .build();


        System.out.println("build..googleSignCallbackSdk..");
        DateTime now = new DateTime(System.currentTimeMillis());

        Events events = service.events().list("primary")
                    .setMaxResults(10)
                    .setTimeMin(now)
                    .setOrderBy("startTime")
                .setSingleEvents(true).execute();

        List<Event> items = events.getItems();
        if(items.isEmpty()) {
            System.out.println("No upcoming events found.");
        }else{
            System.out.println("Upcoming events");
            for(Event event:items){
                DateTime start = event.getStart().getDateTime();
                if(start == null){
                    start = event.getStart().getDate();
                }
                System.out.printf("%s (%s)\n" ,event.getSummary(),start);
            }
        }
    }


    private static Credential getCredentials(final NetHttpTransport netHttpTransport) throws IOException{

        InputStream inputStream = GoogleOAuthController.class.getResourceAsStream(TOKEN_DIRECTORY_PATH+TOKEN_FILE_PATH);
        if(inputStream == null) {
            throw new FileNotFoundException("Resource not found: "+ TOKEN_DIRECTORY_PATH + TOKEN_FILE_PATH);
        }

        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(inputStream));
      //  clientSecrets.set("redirect_uri","http://localhost:9101/dailylog2/google/auth");
        System.out.println(clientSecrets.toPrettyString());

        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                netHttpTransport, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File("accessTokens")))
                .setAccessType("offline")
                .build();

        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(8888).build();
        Credential credential = new AuthorizationCodeInstalledApp(flow,receiver).authorize("user");

        return credential;
    }
    
}
