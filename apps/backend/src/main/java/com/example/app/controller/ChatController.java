package com.example.app.controller;

import java.security.Principal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import com.example.app.common.EMessageType;
import com.example.app.model.MessageEntity;
import com.example.app.model.UserEntity;
import com.example.app.repository.MessageRepository;
import com.example.app.service.MessageService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Controller
public class ChatController {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private MessageService messageService;

    private UserEntity getUser(StompHeaderAccessor headerAccessor) {
        Principal authentication = headerAccessor.getUser();
        if (authentication instanceof UsernamePasswordAuthenticationToken authToken) {
            return (UserEntity) authToken.getPrincipal();
        } else {
            return null;
        }
    }

    @MessageMapping("/send")
    @SendTo("/send/messages")
    public MessageEntity sendMessage(String message, StompHeaderAccessor headerAccessor) {
        UserEntity user = getUser(headerAccessor);
        if (user != null) {
            log.info("WS From USER {}", user.getEmail());
            return messageService.saveMessage(message, user, EMessageType.SEND);
        }
        else{
            return null;
        }
    }

    @MessageMapping("/receive")
    @SendTo("/receive/messages")
    public List<MessageEntity> getMessage(StompHeaderAccessor headerAccessor) {
        UserEntity user = getUser(headerAccessor);
        if (user != null) {
            return messageRepository.findAllByUser(user);
        }
        else{
            return new ArrayList<>();
        }

    }

    @EventListener
    public void handleSessionConnectEvent(SessionConnectEvent event) {
        System.out.println("Session Connect Event");
    }

    @EventListener
    public void handleSessionDisconnectEvent(SessionDisconnectEvent event) {
        System.out.println("Session Disconnect Event");
    }

}