package com.neura.neurahealth.controller;

import com.neura.neurahealth.model.PsicologoTable;
import com.neura.neurahealth.repository.PsicologoRepository;
import com.neura.neurahealth.service.dto.PsicologocentroDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.assertj.core.api.BDDAssertions.then;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PsicologoControllerE2ETest {

    @Autowired
    private PsicologoRepository psicologoRepository;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @LocalServerPort
    private int port;

    /**
     * E2E TEST - GET MAPPING DE LEFT JOIN DE PSICOLOGOS Y CENTROS
     */
    @Test
    public void getPsicologosCentrosJoinE2ETest(){

        //Given
        String query =
                """
                SELECT P.ID, P.PSIC_DATA, P.PSIC_NAME, C.EMPLOYER_NAME, C.POSTAL_CODE 
                FROM PSICOLOGOS P
                LEFT JOIN CENTROS C
                ON P.EMPLOYER_ID = C.EMPLOYER_ID;
                """;
        List<PsicologocentroDTO> psicologocentroDTOS = new ArrayList<>();
        psicologocentroDTOS = jdbcTemplate.query(query,
                (rs, rowNum) ->
                        new PsicologocentroDTO(
                                rs.getLong("ID"),
                                rs.getString("PSIC_DATA"),
                                rs.getString("PSIC_NAME"),
                                rs.getString("EMPLOYER_NAME"),
                                rs.getLong("POSTAL_CODE")
                        ));

        //When
        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/psicologos/joincentros";

        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List<PsicologocentroDTO>> result = testRestTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<PsicologocentroDTO>>() {}
        );

        //Then
        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(psicologocentroDTOS);
    }

    /**
     * TEST E2E: POST REQUEST (insertar nuevo psicólogo)
     */
    @Test
    public void return_http_created_when_post_ok(){

        //Given
        PsicologoTable psicologoTable = new PsicologoTable();
        psicologoTable.setPsicData("Jane Doe");
        psicologoTable.setPsicName("janedoe3");
        psicologoTable.setPsicPwd("password123");
        psicologoTable.setEmployerId(30001L);
        PsicologoTable newPsic = psicologoRepository.save(psicologoTable);

        //When
        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/psicologos";
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<PsicologoTable> entity = new HttpEntity<>(newPsic,headers);

        ResponseEntity<PsicologoTable> result = testRestTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<PsicologoTable>() {}
        );

        //Then
        Long id = newPsic.getId();
        newPsic.setId(id+1);
        then(result.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        then(result.getBody()).isEqualTo(newPsic);
    }
}
