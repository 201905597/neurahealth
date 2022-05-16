package com.neura.neurahealth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PsicologocentroDTO {
    private Long psicId;
    private String psicData;
    private String psicName;
    private String employerName;
    private Long postalCode;
}
