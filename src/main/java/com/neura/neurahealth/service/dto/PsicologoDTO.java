package com.neura.neurahealth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PsicologoDTO {
    private Long id;
    private String psicName;
    private String psicPwd;
    private Long employerId;
}

