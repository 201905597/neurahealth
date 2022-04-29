package com.neura.neurahealth.service.impl;

import com.neura.neurahealth.repository.PsicologoRepository;
import com.neura.neurahealth.service.PsicologoService;
import com.neura.neurahealth.service.dto.PsicologoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class PsicologoServiceImpl implements PsicologoService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PsicologoRepository psicologoRepository;

    /**
     * GET REQUEST
     * @return ALL Psicologos from PSICOLOGOS table
     */
    @Override
    public List<PsicologoDTO> getPsicologos() {
        return StreamSupport.stream(psicologoRepository.findAll().spliterator(),false)
                .map(obj -> new PsicologoDTO(
                        obj.getId(),
                        obj.getPsicName(),
                        obj.getPsicPwd(),
                        obj.getEmployerId()))
                .toList();
    }

    /**
     * GET REQUEST
     * @return Psicologos autónomos o freelance (no pertenecen a un centro)
     */
    @Override
    public List<PsicologoDTO> getPsicologosFreelance() {
        String query=
                """
                SELECT ID, PSIC_NAME, PSIC_PWD, EMPLOYER
                FROM PSICOLOGOS 
                WHERE EMPLOYER_ID = 0;
                """;

        List<PsicologoDTO> psicologosFreelance = jdbcTemplate.query(
                query,
                (rs, rowNum) ->
                        new PsicologoDTO(
                                rs.getLong("ID"),
                                rs.getString("PSIC_NAME"),
                                rs.getString("PSIC_PWD"),
                                rs.getLong("EMPLOYER_ID"))
        );

        return psicologosFreelance;
    }

    /**
     * DELETE REQUEST: Dar de baja a un psicólogo
     * @param id ID del psicólogo que se quiere borrar de la BBDD
     */
    @Override
    public void deletePsicologo(Long id) {
        psicologoRepository.deleteById(id);
    }
}
