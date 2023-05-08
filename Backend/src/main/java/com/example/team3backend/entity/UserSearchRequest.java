package com.example.team3backend.entity;

import com.example.team3backend.constants.Constants;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = Constants.DatabaseConstants.USER_SEARCH_REQUEST,schema = Constants.DatabaseConstants.SCHEMA)
public class UserSearchRequest {
    @Id
    @Column(name = Constants.DatabaseConstants.USER_ID, nullable = false)
    private String userId;

    @Column(name = Constants.DatabaseConstants.SEARCH_REQUEST, nullable = false)
    private String searchRequest;

}