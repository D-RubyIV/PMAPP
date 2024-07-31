package com.example.app.response;
import com.example.app.model.CollectionEntity;
import com.example.app.model.ProductEntity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OverviewProductResponseV3 {
    private ProductEntity product;
    private long totalColor;
    private long totalSize;
    private long quantity;
}
