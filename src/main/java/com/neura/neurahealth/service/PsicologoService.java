package com.neura.neurahealth.service;

import com.neura.neurahealth.model.PsicologoTable;
import com.neura.neurahealth.model.UsuarioTable;
import com.neura.neurahealth.service.dto.PsicologoDTO;
import com.neura.neurahealth.service.dto.PsicologocentroDTO;

import java.util.List;

public interface PsicologoService {

    //All data from Psicologos Table
    List<PsicologoDTO> getPsicologos();

    //Psicologos Freelance
    List<PsicologoDTO> getPsicologosFreelance();

    //Datos de psicólogos
    List<PsicologocentroDTO> getPsicologoCentroJoin();

    //Insertar psicólogo
    PsicologoTable insertPsicologo(PsicologoTable psicologoTable);
}

