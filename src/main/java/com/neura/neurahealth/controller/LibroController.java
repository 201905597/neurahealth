package com.neura.neurahealth.controller;

import com.neura.neurahealth.service.LibroService;
import com.neura.neurahealth.service.dto.CentroDTO;
import com.neura.neurahealth.service.dto.LibroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class LibroController {

    @Autowired
    private LibroService libroService;

    /**
     * GET REQUEST: ALL LIBROS
     * @return todos los libros
     */
    @GetMapping("/libros")
    public ResponseEntity<List<CentroDTO>> getAllLibros(){
        List<LibroDTO> libros = new ArrayList<LibroDTO>();
        libros = libroService.getLibros();
        return ResponseEntity.ok().body(libros);
    }
}
