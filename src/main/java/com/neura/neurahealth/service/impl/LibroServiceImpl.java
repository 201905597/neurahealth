package com.neura.neurahealth.service.impl;


import com.neura.neurahealth.repository.LibroRepository;
import com.neura.neurahealth.service.CentroService;
import com.neura.neurahealth.service.LibroService;
import com.neura.neurahealth.service.dto.LibroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class LibroServiceImpl  implements LibroService {

    @Autowired
    private LibroRepository libroRepository;

    //ALL libros from LIBROS table
    @Override
    public List<LibroDTO> getLibros() {
        return StreamSupport.stream(libroRepository.findAll().spliterator(),false)
                .map(obj -> new LibroDTO(
                        obj.getAutor(),
                        obj.getTitulo(),
                        obj.getFecha_pub(),
                        obj.getEmocion()))
                .toList();
    }
}
