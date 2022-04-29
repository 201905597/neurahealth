package com.neura.neurahealth.service;

import com.neura.neurahealth.service.dto.CentroDTO;

import java.util.List;

public interface CentroService {

    //All data from Centros Table
    List<CentroDTO> getCentros();
}
