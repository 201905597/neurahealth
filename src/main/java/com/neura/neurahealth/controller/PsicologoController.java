package com.neura.neurahealth.controller;

import com.neura.neurahealth.model.PsicologoTable;
import com.neura.neurahealth.model.UsuarioTable;
import com.neura.neurahealth.service.PsicologoService;
import com.neura.neurahealth.service.dto.PsicologoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/psicologos")
    public ResponseEntity<PsicologoTable> insertarUsuario(@RequestBody PsicologoTable psicologo){
        try{
            PsicologoTable newPsic = psicologoService.insertPsicologo(psicologo);
            return new ResponseEntity<>(newPsic, HttpStatus.CREATED);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
