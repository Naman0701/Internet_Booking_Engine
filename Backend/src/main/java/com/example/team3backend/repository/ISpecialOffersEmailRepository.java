package com.example.team3backend.repository;

import com.example.team3backend.entity.SpecialOffersEmail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ISpecialOffersEmailRepository extends JpaRepository<SpecialOffersEmail, String> {
}