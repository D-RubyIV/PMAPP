package com.example.app.response;
import com.example.app.model.CollectionEntity;
import com.example.app.model.MediaEntity;
import com.example.app.model.ProductEntity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OverviewProductResponseV2 {
    private String product;
    private String code;
}
