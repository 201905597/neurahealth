package com.neura.neurahealth.controller;

import com.neura.neurahealth.repository.UsuarioRepository;
import com.neura.neurahealth.service.dto.UsuarioDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;

import java.util.List;
import java.util.stream.StreamSupport;

import static org.assertj.core.api.BDDAssertions.then;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UsuarioControllerE2ETest {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TestRestTemplate testRestTemplate;

    @LocalServerPort
    private int port;

    /**
     * TEST E2E: GET MAPPING DE TODOS LOS USUARIOS
     */
    @Test
    public void getAllUsersE2ETest(){

        //Given
        List<UsuarioDTO> usuarios = StreamSupport.stream(usuarioRepository.findAll().spliterator(),false)
                .map(obj -> new UsuarioDTO(
                        obj.getId(),
                        obj.getUserData(),
                        obj.getUserName(),
                        obj.getUserPwd(),
                        obj.getUserEmail(),
                        obj.getIdPsic()
                )).toList();

        //When
        String url = "http://localhost:" + Integer.toString(port) + "/api/v1/usuarios";
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<List<UsuarioDTO>> result = testRestTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<List<UsuarioDTO>>() {}
        );

        //Then
        then(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(result.getBody()).isEqualTo(usuarios);
    }
}
