package com.neura.neurahealth.service;

import com.neura.neurahealth.service.dto.LibroDTO;

import java.util.List;

public interface LibroService {

    //All data from Libros Table
    List<LibroDTO> getLibros();
}
