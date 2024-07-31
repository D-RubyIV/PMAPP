package com.example.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "comments")
public class CommentEntity extends BaseEntity {
    private String content;
    private int star;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private UserEntity user;
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private ProductEntity product;
    private LocalDateTime time;
    @ManyToOne(optional = true)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "id")
    private CommentEntity commentModel;

}
