package com.neura.neurahealth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {
    private Long id;
    private String userData;
    private String userName;
    private String userPwd;
    private Long idPsic;
}
