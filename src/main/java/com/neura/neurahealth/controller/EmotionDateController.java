package com.neura.neurahealth.controller;

import com.neura.neurahealth.service.EmotionDateService;
import com.neura.neurahealth.service.dto.EmotionDateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class EmotionDateController {

    @Autowired
    private EmotionDateService emotionDateService;

    /**
     * GET REQUEST - EMOCIONES GUARDADAS POR FECHA
     * @param id ID del usuario del que queremos ver las emociones guardadas
     * @return emocioens del usuario guardadas por fecha
     */
    @GetMapping("/emotiondates/{id}")
    public ResponseEntity<List<EmotionDateDTO>> getEmotionsById(@PathVariable("id") long id){
        List<EmotionDateDTO> emotions = new ArrayList<>();
        emotions = emotionDateService.getEmotionDates();
        List<EmotionDateDTO> userEmotions = new ArrayList<>();
        for (EmotionDateDTO emotion : emotions){
            if (emotion.getUserId() == id){
                userEmotions.add(emotion);
            }
        }
        return ResponseEntity.ok().body(userEmotions);
    }

    @GetMapping("/emotiondates/{id}/{mm}/{yyyy}")
    public ResponseEntity<List<EmotionDateDTO>> getEmotionsById(@PathVariable("id") long id, @PathVariable("mm") String mm,@PathVariable("yyyy") String yyyy){
        List<EmotionDateDTO> userEmotions = new ArrayList<>();
        String mmyyyy = mm + yyyy;
        userEmotions = emotionDateService.getEmotionsByUserDate(id,mmyyyy);
        return ResponseEntity.ok().body(userEmotions);
    }
}
