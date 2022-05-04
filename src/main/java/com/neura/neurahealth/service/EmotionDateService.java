package com.neura.neurahealth.service;

import com.neura.neurahealth.service.dto.EmotionDateDTO;

import java.util.List;

public interface EmotionDateService {

    //All data from Emotion Dates table
    List<EmotionDateDTO> getEmotionDates();

    //Emotions by user id
    List<EmotionDateDTO> getEmotionsByUserDate(Long id, String mmyyyy);
}
