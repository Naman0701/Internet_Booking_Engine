package com.example.team3backend.entity;

import com.example.team3backend.constants.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = Constants.DatabaseConstants.SPECIAL_OFFERS_EMAIL, schema = Constants.DatabaseConstants.SCHEMA)
public class SpecialOffersEmail {
    @Id
    @Column(name = Constants.DatabaseConstants.EMAIL)
    private String email;
}
