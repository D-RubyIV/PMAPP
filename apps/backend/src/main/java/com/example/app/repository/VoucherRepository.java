package com.example.app.repository;

import com.example.app.model.VoucherModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoucherRepository extends JpaRepository<VoucherModel, Integer> {
    Optional<VoucherModel> findByNameOrCode(String name, String code);
    Optional<VoucherModel> findByCode(String code);
}
