package com.neura.neurahealth.service;

import com.neura.neurahealth.service.dto.PsicologoDTO;

import java.util.List;

public interface PsicologoService {

    //All data from Psicologos Table
    List<PsicologoDTO> getPsicologos();

    //Psicologos Freelance
    List<PsicologoDTO> getPsicologosFreelance();

    //Borrar psicologos
    void deletePsicologo(Long id);
}

