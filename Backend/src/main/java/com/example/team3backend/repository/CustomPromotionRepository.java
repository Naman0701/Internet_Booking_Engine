package com.example.team3backend.repository;

import com.example.team3backend.entity.CustomPromotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomPromotionRepository extends JpaRepository<CustomPromotion,String> {

    List<CustomPromotion> findByApplicableRoomTypeContaining(String roomType);
}
