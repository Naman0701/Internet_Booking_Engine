package com.example.team3backend.service;

import com.example.team3backend.constants.Enums;
import com.example.team3backend.entity.UserSearchRequest;
import com.example.team3backend.exception.UserNotFoundException;
import com.example.team3backend.repository.UserSearchRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserSearchRequestService {

    @Autowired
    UserSearchRequestRepository userSearchRequestRepository;

    public UserSearchRequest createUserSearchRequest(String userId, String requestBody) {
        UserSearchRequest userSearchRequest = new UserSearchRequest();
        userSearchRequest.setUserId(userId);
        userSearchRequest.setSearchRequest(requestBody);
        return userSearchRequestRepository.save(userSearchRequest);
    }

    public UserSearchRequest updateUserSearchRequest(String userId, String requestBody) {
        Optional<UserSearchRequest> optionalUserSearchRequest = userSearchRequestRepository.findById(userId);
        if (optionalUserSearchRequest.isPresent()) {
            UserSearchRequest userSearchRequest = optionalUserSearchRequest.get();
            userSearchRequest.setSearchRequest(requestBody);
            return userSearchRequestRepository.save(userSearchRequest);
        } else {
            throw new UserNotFoundException(Enums.ErrorMessageEnum.USER_NOT_FOUND.getValue() + userId);
        }
    }

    public UserSearchRequest getUserSearchRequest(String userId) {
        Optional<UserSearchRequest> optionalUserSearchRequest = userSearchRequestRepository.findById(userId);
        if (optionalUserSearchRequest.isPresent()) {
            return optionalUserSearchRequest.get();
        } else {
            throw new UserNotFoundException(Enums.ErrorMessageEnum.USER_NOT_FOUND.getValue() + userId);
        }
    }
}
