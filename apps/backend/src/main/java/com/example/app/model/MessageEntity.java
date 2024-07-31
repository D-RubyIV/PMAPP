package com.example.app.model;

import com.example.app.common.EMessageType;
import jakarta.persistence.*;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "messages")
public class MessageEntity extends BaseEntity{
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String message;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn
    private MediaEntity media;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @Enumerated(EnumType.STRING)
    private EMessageType type;

}
