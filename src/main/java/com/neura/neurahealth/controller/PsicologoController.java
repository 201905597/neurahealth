package com.neura.neurahealth.controller;

import com.neura.neurahealth.service.PsicologoService;
import com.neura.neurahealth.service.dto.PsicologoDTO;
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
public class PsicologoController {

    @Autowired
    private PsicologoService psicologoService;

    @GetMapping("/psicologos")
    public ResponseEntity<List<PsicologoDTO>> getAllPsicologos(){
        List<PsicologoDTO> psicologos = new ArrayList<PsicologoDTO>();
        psicologos = psicologoService.getPsicologos();
        return ResponseEntity.ok().body(psicologos);
    }

    @GetMapping("/psicologos/{id}")
    public ResponseEntity<PsicologoDTO> getPsicologoById(@PathVariable("id") long id){
        PsicologoDTO psicologoEncontrado = null;
        List<PsicologoDTO> psicologos = new ArrayList<PsicologoDTO>();
        psicologos = psicologoService.getPsicologos();
        for (PsicologoDTO psicologo : psicologos){
            if (psicologo.getId() == id)
                psicologoEncontrado = psicologo;
        }
        return ResponseEntity.ok().body(psicologoEncontrado);
    }
}
