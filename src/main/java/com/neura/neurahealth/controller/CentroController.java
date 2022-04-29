package com.neura.neurahealth.controller;

import com.neura.neurahealth.service.CentroService;
import com.neura.neurahealth.service.dto.CentroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CentroController {

    @Autowired
    private CentroService centroService;

    /**
     * GET REQUEST: ALL CENTROS
     * @return todos los centros que trabajan con NeuraHealth
     */
    @GetMapping("/centros")
    public ResponseEntity<List<CentroDTO>> getAllCentros(){
        List<CentroDTO> centros = new ArrayList<CentroDTO>();
        centros = centroService.getCentros();
        return ResponseEntity.ok().body(centros);
    }
}
