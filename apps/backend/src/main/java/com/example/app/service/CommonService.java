package com.example.app.service;

import com.example.app.common.Status;
import com.example.app.model.OrderDetailEntity;
import com.example.app.model.OrderEntity;
import com.example.app.model.UserEntity;
import com.example.app.repository.OrderDetailRepository;
import com.example.app.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CommonService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    public List<OrderDetailEntity> getNearestPendingOrderDetails(UserEntity userModel){
        List<OrderDetailEntity> listPendingOrderDetails = new ArrayList<>();
        Optional<OrderEntity> currentOrderOptional = orderRepository.findTopByUserAndStatusOrderByIdDesc(userModel, Status.Pending);
        // IF EXIST PENDING ORDER
        if (currentOrderOptional.isPresent()){
            OrderEntity currentOrder = currentOrderOptional.get();
            listPendingOrderDetails = orderDetailRepository.findByOrder(currentOrder);
        }
        // CREATE NEW ORDER IF NOT EXIST PENDING ORDER
        else{
            OrderEntity currentOrderCreated = new OrderEntity();
            currentOrderCreated.setUser(userModel);
            currentOrderCreated.setStatus(Status.Pending);
            orderRepository.save(currentOrderCreated);
            listPendingOrderDetails = orderDetailRepository.findByOrder(currentOrderCreated);
        }
        return listPendingOrderDetails;

    }

}
