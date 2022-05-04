package com.neura.neurahealth.service.impl;

import com.neura.neurahealth.repository.EmotionDateRepository;
import com.neura.neurahealth.service.EmotionDateService;
import com.neura.neurahealth.service.dto.EmotionDateDTO;
import com.neura.neurahealth.service.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class EmotionDateServiceImpl implements EmotionDateService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private EmotionDateRepository emotionDateRepository;

    @Override
    public List<EmotionDateDTO> getEmotionDates() {
        return StreamSupport.stream(emotionDateRepository.findAll().spliterator(),false)
                .map(obj -> new EmotionDateDTO(
                        obj.getEmotionName(),
                        obj.getFecha(),
                        obj.getUserId()))
                .toList();
    }

    @Override
    public List<EmotionDateDTO> getEmotionsByUserDate(Long id, String mmyyyy) {

        String mm = mmyyyy.substring(0,2);
        String yyyy = mmyyyy.substring(2);

        String query = "SELECT EMOTION_NAME,FECHA,USER_ID FROM EMOTIONDATES WHERE (USER_ID=" + "\'" + id + "\'" + ") AND (FECHA BETWEEN " + "\'" + mm +  "-01-" + yyyy + "\'" + " AND " + "\'" + mm + "-31-" + yyyy + "\');";

        List<EmotionDateDTO> emotionsUserDate =jdbcTemplate.query(
            query,
                (rs,rowNum) ->
                        new EmotionDateDTO(
                            rs.getString("EMOTION_NAME"),
                                rs.getDate("FECHA"),
                                rs.getLong("USER_ID")
                        )
        );

        return emotionsUserDate;
    }
}
