package com.neura.neurahealth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LibroDTO {
    private String titulo;
    private String autor;
    private Date fecha_pub;
    private String emocion;

}
