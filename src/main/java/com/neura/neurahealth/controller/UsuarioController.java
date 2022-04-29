package com.neura.neurahealth.controller;

import com.neura.neurahealth.model.UsuarioTable;
import com.neura.neurahealth.service.UsuarioService;
import com.neura.neurahealth.service.dto.UsuarioDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/usuarios")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuarios(){
        List<UsuarioDTO> usuarios = new ArrayList<UsuarioDTO>();
        usuarios = usuarioService.getUsuarios();
        return ResponseEntity.ok().body(usuarios);
    }

    @GetMapping("/usuarios/{id}")
    public ResponseEntity<UsuarioDTO> getUsuarioById(@PathVariable("id") long id){
        UsuarioDTO usuarioEncontrado = null;
        List<UsuarioDTO> usuarios = new ArrayList<UsuarioDTO>();
        usuarios = usuarioService.getUsuarios();
        for (UsuarioDTO usuario : usuarios){
            if (usuario.getId() == id)
                usuarioEncontrado = usuario;
        }
        return ResponseEntity.ok().body(usuarioEncontrado);
    }

    @GetMapping("/usuarios/conpsic")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuariosConPsic(){
        List<UsuarioDTO> usuarios = new ArrayList<UsuarioDTO>();
        usuarios = usuarioService.getUsuariosConPsicologo();
        return ResponseEntity.ok().body(usuarios);
    }

    @GetMapping("/usuarios/conpsic/{idPsic}")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuariosConPsicById(@PathVariable("idPsic") long idPsic){
        List<UsuarioDTO> usuarios = new ArrayList<UsuarioDTO>();
        List<UsuarioDTO> usuariosFound = new ArrayList<UsuarioDTO>();
        usuarios = usuarioService.getUsuariosConPsicologo();
        for (UsuarioDTO usuario : usuarios){
            if (usuario.getIdPsic() == idPsic){
                usuariosFound.add(usuario);
            }
        }
        return ResponseEntity.ok().body(usuariosFound);
    }

    @GetMapping("/usuarios/sinpsic")
    public ResponseEntity<List<UsuarioDTO>> getAllUsuariosSinPsic(){
        List<UsuarioDTO> usuarios = new ArrayList<UsuarioDTO>();
        usuarios = usuarioService.getUsuariosSinPsicologo();
        return ResponseEntity.ok().body(usuarios);
    }

    @DeleteMapping("/usuarios/{id}")
    public ResponseEntity<UsuarioDTO> deleteUsuarioById(@PathVariable("id") long id){
        usuarioService.deleteUsuario(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/usuarios/{id}")
    public ResponseEntity<UsuarioTable> updateUsuario(@PathVariable Long id, @RequestBody UsuarioTable usuario){
        UsuarioTable newUser = usuarioService.updateUsuario(id,usuario);
        if (newUser == null){
            return ResponseEntity.ok().body(null);
        }
        return ResponseEntity.ok().body(newUser);
    }

    @PostMapping("/usuarios")
    public ResponseEntity<UsuarioTable> insertarUsuario(@RequestBody UsuarioTable usuario){
        try{
            UsuarioTable newUser = usuarioService.insertUsuario(usuario);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        }catch(Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
