package com.example.team3backend.service;

import com.example.team3backend.entity.SpecialOffersEmail;
import com.example.team3backend.repository.ISpecialOffersEmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpecialOffersEmailService {

    @Autowired
    private ISpecialOffersEmailRepository specialOffersEmailRepository;

    public void saveEmail(String email) throws Exception {
        SpecialOffersEmail specialOffersEmail = new SpecialOffersEmail();
        specialOffersEmail.setEmail(email);
        try {
            specialOffersEmailRepository.save(specialOffersEmail);
        } catch (Exception e) {
            throw new Exception("Error saving email to database", e);
        }
    }
}
