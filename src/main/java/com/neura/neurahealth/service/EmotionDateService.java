package com.neura.neurahealth.service;

import com.neura.neurahealth.model.EmotionDateTable;
import com.neura.neurahealth.service.dto.EmotionDateDTO;

import java.sql.Date;
import java.util.List;

public interface EmotionDateService {

    //All data from Emotion Dates table
    List<EmotionDateDTO> getEmotionDates();

    //Emotions by user id
    List<EmotionDateDTO> getEmotionsByUserDate(Long id, String mmyyyy);

    //Emoción de una fecha específica
    //EmotionDateDTO getEmotionByIdFecha(Long id, Date fecha);

    //Insertar emoción
    EmotionDateTable insertEmotion(EmotionDateTable emotionDateTable);

    //Borrar emociones
    void deleteEmotionsById(Long id);
}
