package com.example.team3backend.repository;

import com.example.team3backend.entity.UserSearchRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSearchRequestRepository extends JpaRepository<UserSearchRequest,String> {
}
