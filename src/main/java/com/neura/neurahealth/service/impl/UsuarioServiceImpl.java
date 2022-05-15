package com.neura.neurahealth.service.impl;

import com.neura.neurahealth.model.UsuarioTable;
import com.neura.neurahealth.repository.UsuarioRepository;
import com.neura.neurahealth.service.UsuarioService;
import com.neura.neurahealth.service.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     *
     * @return All usuarios from USUARIOS table
     */
    @Override
    public List<UsuarioDTO> getUsuarios() {
        return StreamSupport.stream(usuarioRepository.findAll().spliterator(),false)
                .map(obj -> new UsuarioDTO(
                        obj.getId(),
                        obj.getUserData(),
                        obj.getUserName(),
                        obj.getUserPwd(),
                        obj.getIdPsic()))
                .toList();
    }

    /**
     *
     * @return Usuarios que tienen psicólogo asociado
     */
    @Override
    public List<UsuarioDTO> getUsuariosConPsicologo() {
        String query=
                """
                SELECT U.ID, U.USER_DATA, U.USER_NAME, U.USER_PWD, U.ID_PSIC
                FROM USUARIOS U, PSICOLOGOS P
                WHERE U.ID_PSIC=P.ID;
                """;

        List<UsuarioDTO> usuariosList = jdbcTemplate.query(
                query,
                (rs, rowNum) ->
                        new UsuarioDTO(
                                rs.getLong("ID"),
                                rs.getString("USER_DATA"),
                                rs.getString("USER_NAME"),
                                rs.getString("USER_PWD"),
                                rs.getLong("ID_PSIC"))
        );

        return usuariosList;
    }

    /**
     * @param idPsic ID del psicólogo
     * @return Usuarios que tienen un psicólogo específico asociado
     */
    @Override
    public List<UsuarioDTO> getUsuariosConPsicologoById(Long idPsic) {
        String query= "SELECT ID, USER_NAME, USER_PWD, ID_PSIC FROM USUARIOS WHERE ID_PSIC=" + idPsic + ";";

        List<UsuarioDTO> usuariosList = jdbcTemplate.query(
                query,
                (rs, rowNum) ->
                        new UsuarioDTO(
                                rs.getLong("ID"),
                                rs.getString("USER_DATA"),
                                rs.getString("USER_NAME"),
                                rs.getString("USER_PWD"),
                                rs.getLong("ID_PSIC"))
        );

        return usuariosList;
    }

    /**
     *
     * @return Usuarios que no tienen un psicólogo asociado
     */
    @Override
    public List<UsuarioDTO> getUsuariosSinPsicologo() {
        String query=
                """
                SELECT ID, USER_NAME, USER_PWD, ID_PSIC
                FROM USUARIOS
                WHERE ID_PSIC=0;
                """;

        List<UsuarioDTO> usuariosList = jdbcTemplate.query(
                query,
                (rs, rowNum) ->
                        new UsuarioDTO(
                                rs.getLong("ID"),
                                rs.getString("USER_DATA"),
                                rs.getString("USER_NAME"),
                                rs.getString("USER_PWD"),
                                rs.getLong("ID_PSIC"))
        );

        return usuariosList;
    }

    /**
     * Dar de baja a un usuario
     * @param id ID del usuario que se quiere dar de baja
     */
    @Override
    public void deleteUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    /**
     * Actualizar los datos de un usuario
     * @param id ID del usuario que se quiere actualizar
     * @param usuario objeto del usuario con los cambios añadidos
     * @return usuario actualizado
     */
    @Override
    public UsuarioTable updateUsuario(Long id, UsuarioTable usuario) {
        if (usuarioRepository.existsById(id)){
            return usuarioRepository.save(usuario);
        }else{
            return null;
        }
    }

    /**
     * Añadir un nuevo usuario a la base de datos
     * @param usuarioTable nuevo usuario que se quiere añadir
     * @return usuario añadido
     */
    @Override
    public UsuarioTable insertUsuario(UsuarioTable usuarioTable) {
        UsuarioTable userTable= new UsuarioTable();
        // Como es un POST, no pasamos el ID (es un Long @Id, se autoincrementa solo)
        userTable.setUserData(usuarioTable.getUserData());
        userTable.setUserName(usuarioTable.getUserName());
        userTable.setUserPwd(usuarioTable.getUserPwd());
        userTable.setIdPsic(usuarioTable.getIdPsic());
        UsuarioTable newUser = usuarioRepository.save(userTable);
        return newUser;
    }
}
