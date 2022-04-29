package com.neura.neurahealth.service;

import com.neura.neurahealth.model.UsuarioTable;
import com.neura.neurahealth.service.dto.UsuarioDTO;

import java.util.List;

public interface UsuarioService {

    //All data from Usuarios Table
    List<UsuarioDTO> getUsuarios();

    //Usuarios con Psicologo (JOIN EXAMPLE 1)
    List<UsuarioDTO> getUsuariosConPsicologo();

    //Usuarios con el mismo Psicologo
    List<UsuarioDTO> getUsuariosConPsicologoById(Long idPsic);

    //Usuarios sin Psicologo
    List<UsuarioDTO> getUsuariosSinPsicologo();

    //Borrar Usuario
    void deleteUsuario(Long id);

    //Actualizar Usuario
    UsuarioTable updateUsuario(Long id, UsuarioTable usuario);

    //Insertar usuario
    UsuarioTable insertUsuario(UsuarioTable usuarioTable);
}
