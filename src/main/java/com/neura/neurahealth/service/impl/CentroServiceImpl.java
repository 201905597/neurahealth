package com.neura.neurahealth.service.impl;

import com.neura.neurahealth.repository.CentroRepository;
import com.neura.neurahealth.service.CentroService;
import com.neura.neurahealth.service.dto.CentroDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class CentroServiceImpl implements CentroService {

    @Autowired
    private CentroRepository centroRepository;

    //ALL centros from CENTROS table
    @Override
    public List<CentroDTO> getCentros() {
        return StreamSupport.stream(centroRepository.findAll().spliterator(),false)
                .map(obj -> new CentroDTO(
                        obj.getEmployerId(),
                        obj.getEmployerName(),
                        obj.getPostalCode()))
                .toList();
    }
}
