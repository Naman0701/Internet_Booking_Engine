package com.example.team3backend.utility;

import com.example.team3backend.dto.AvailableRoomResponseDto;
import com.example.team3backend.entity.CustomPromotion;
import com.example.team3backend.repository.CustomPromotionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
public class BestDealUtil {
    @Autowired
    private CustomPromotionRepository customPromotionRepository;
    public void getBestDeal(Set<AvailableRoomResponseDto> availableRoomsResultSet){
        for(AvailableRoomResponseDto availableRoomResult:availableRoomsResultSet){
            List<CustomPromotion> customPromotionList=customPromotionRepository.findByApplicableRoomTypeContaining(availableRoomResult.getRoomTypeName());
            if(customPromotionList.size()==0)
            {
                availableRoomResult.setSpecialDeal(false);
                continue;
            }
            CustomPromotion bestCustomPromotion=customPromotionList.stream()
                    .min(Comparator.comparing(CustomPromotion::getPriceFactor))
                    .orElse(null);
            availableRoomResult.setSpecialDeal(true);
            availableRoomResult.setSpecialDealDescription(bestCustomPromotion.getPromotionDescription());
        }
    }
}
