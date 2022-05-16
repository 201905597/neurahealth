package com.neura.neurahealth.controller;

import com.neura.neurahealth.model.EmotionDateTable;
import com.neura.neurahealth.model.UsuarioTable;
import com.neura.neurahealth.service.EmotionDateService;
import com.neura.neurahealth.service.dto.EmotionDateDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
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
     * @return emociones del usuario guardadas por fecha
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

    /**
     * GET REQUEST - EMOCIONES DE UN MES Y AÑO ESPECÍFICOS
     * @param id ID del usuario del que queremos ver las emociones guardadas
     * @param mm mes
     * @param yyyy año
     * @return emociones del usuario de ese mes específico
     */
    @GetMapping("/emotiondates/{id}/{mm}/{yyyy}")
    public ResponseEntity<List<EmotionDateDTO>> getEmotionsById(@PathVariable("id") long id, @PathVariable("mm") String mm,@PathVariable("yyyy") String yyyy){
        List<EmotionDateDTO> userEmotions = new ArrayList<>();
        String mmyyyy = mm + yyyy;
        userEmotions = emotionDateService.getEmotionsByUserDate(id,mmyyyy);
        return ResponseEntity.ok().body(userEmotions);
    }

    /**
     * GET REQUEST - EMOCIÓN DE UNA FECHA ESPECÍFICA
     * @param id ID del usuario del que queremos ver las emociones guardadas
     * @param fecha día, mes y año
     * @return emoción del usuario en esa fecha
     */
    @GetMapping("/emotiondates/{id}/{fecha}")
    public ResponseEntity<Boolean> getEmotionByIdFecha(@PathVariable("id") long id, @PathVariable("fecha") Date fecha){
        /*EmotionDateDTO userEmotion = new EmotionDateDTO();
        userEmotion = emotionDateService.getEmotionByIdFecha(id,fecha);
        return ResponseEntity.ok().body(userEmotion);*/
        Boolean existe = false;
        String fechastring = fecha.toString();
        String mm = fechastring.substring(5,7);
        String yyyy = fechastring.substring(0,4);
        List<EmotionDateDTO> userEmotions = new ArrayList<>();
        String mmyyyy = mm + yyyy;
        userEmotions = emotionDateService.getEmotionsByUserDate(id,mmyyyy);
        for (EmotionDateDTO emotion : userEmotions){
            if (emotion.getFecha().equals(fecha)){
                existe = true;
            }
        }
        return ResponseEntity.ok().body(existe);
    }

    /**
     * POST REQUEST - inserción de estados de ánimo del usuario
     * @param emotionDateTable
     * @return
     */
    @PostMapping("/emotiondates")
    public ResponseEntity<EmotionDateTable> insertarEmocion(@RequestBody EmotionDateTable emotionDateTable){
        try{
            EmotionDateTable newEmotion = emotionDateService.insertEmotion(emotionDateTable);
            return new ResponseEntity<>(newEmotion, HttpStatus.CREATED);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/emotiondates/{id}")
    public ResponseEntity<List<EmotionDateDTO>> deleteEmotions(@PathVariable("id") long id){
        emotionDateService.deleteEmotionsById(id);
        return ResponseEntity.noContent().build();
    }
}
