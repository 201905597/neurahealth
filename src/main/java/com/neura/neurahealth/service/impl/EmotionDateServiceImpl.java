package com.neura.neurahealth.service.impl;

import com.neura.neurahealth.model.EmotionDateTable;
import com.neura.neurahealth.model.UsuarioTable;
import com.neura.neurahealth.repository.EmotionDateRepository;
import com.neura.neurahealth.service.EmotionDateService;
import com.neura.neurahealth.service.dto.EmotionDateDTO;
import com.neura.neurahealth.service.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Arrays;
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
                        obj.getId(),
                        obj.getEmotionName(),
                        obj.getFecha(),
                        obj.getUserId()))
                .toList();
    }

    @Override
    public List<EmotionDateDTO> getEmotionsByUserDate(Long id, String mmyyyy) {

        String mm = mmyyyy.substring(0,2);
        String yyyy = mmyyyy.substring(2);
        String[] meses = {"01","03","05","07","08","10","12"};
        String query ="";
        boolean contains = Arrays.stream(meses).anyMatch(mm::equals);
        if (contains){
            query = "SELECT ID,EMOTION_NAME,FECHA,USER_ID FROM EMOTIONDATES WHERE (USER_ID=" + "\'" + id + "\'" + ") AND (FECHA BETWEEN " + "\'" + yyyy + "-" + mm +  "-01" + "\'" + " AND " + "\'" + yyyy + "-" + mm + "-31" + "\');";
        }else if(mm == "02"){

            int anio = Integer.parseInt(yyyy);
            if ((anio % 4 == 0) && ((anio % 100 != 0) || (anio % 400 == 0))){
                query = "SELECT ID,EMOTION_NAME,FECHA,USER_ID FROM EMOTIONDATES WHERE (USER_ID=" + "\'" + id + "\'" + ") AND (FECHA BETWEEN " + "\'" + yyyy + "-" + mm +  "-01" + "\'" + " AND " + "\'" + yyyy + "-" + mm + "-29" + "\');";
            }else{
                query = "SELECT ID,EMOTION_NAME,FECHA,USER_ID FROM EMOTIONDATES WHERE (USER_ID=" + "\'" + id + "\'" + ") AND (FECHA BETWEEN " + "\'" + yyyy + "-" + mm +  "-01" + "\'" + " AND " + "\'" + yyyy + "-" + mm + "-28" + "\');";
            }

        }else{
            query = "SELECT ID,EMOTION_NAME,FECHA,USER_ID FROM EMOTIONDATES WHERE (USER_ID=" + "\'" + id + "\'" + ") AND (FECHA BETWEEN " + "\'" + yyyy + "-" + mm +  "-01" + "\'" + " AND " + "\'" + yyyy + "-" + mm + "-30" + "\');";
        }

        List<EmotionDateDTO> emotionsUserDate =jdbcTemplate.query(
            query,
                (rs,rowNum) ->
                        new EmotionDateDTO(
                                rs.getLong("ID"),
                                rs.getString("EMOTION_NAME"),
                                rs.getDate("FECHA"),
                                rs.getLong("USER_ID")
                        )
        );

        return emotionsUserDate;
    }

    /*@Override
    public EmotionDateDTO getEmotionByIdFecha(Long id, Date fecha) {

        String query = "SELECT * FROM EMOTIONDATES WHERE USER_ID=" + "\'" + id + "\'" + "AND FECHA=" + "\'" + fecha + "\';";
        EmotionDateDTO emotionDateDTO = jdbcTemplate.queryForObject(query, new Object[]{id},
                (rs,rowNum) ->
                        new EmotionDateDTO(
                                rs.getString("EMOTION_NAME"),
                                rs.getDate("FECHA"),
                                rs.getLong("USER_ID")
                        )
        );

        return null;
    }*/

    @Override
    public EmotionDateTable insertEmotion(EmotionDateTable emotionDateTable) {
        EmotionDateTable emotionDateTable1 = new EmotionDateTable();
        // Como es un POST, no pasamos el ID (es un Long @Id, se autoincrementa solo)
        emotionDateTable1.setEmotionName(emotionDateTable.getEmotionName());
        emotionDateTable1.setFecha(emotionDateTable.getFecha());
        emotionDateTable1.setUserId(emotionDateTable.getUserId());
        EmotionDateTable newEmotion = emotionDateRepository.save(emotionDateTable1);
        return newEmotion;
    }

    @Override
    public void deleteEmotionsById(Long id) {
        emotionDateRepository.deleteByUserId(id);
    }
}
