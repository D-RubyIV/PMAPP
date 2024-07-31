package com.example.app.service;

import com.example.app.common.EMessageType;
import com.example.app.model.MessageEntity;
import com.example.app.model.UserEntity;
import com.example.app.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    public MessageEntity saveMessage(String message, UserEntity userEntity, EMessageType eMessageType){
        MessageEntity messageEntity = new MessageEntity();
        messageEntity.setMessage(message);
        messageEntity.setUser(userEntity);
        messageEntity.setMedia(null);
        messageEntity.setType(eMessageType);
        return messageRepository.save(messageEntity);
    }


}
