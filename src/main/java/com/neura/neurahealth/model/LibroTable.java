package com.neura.neurahealth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("LIBROS")
public class LibroTable {
    private @Column("TITULO") String autor;
    private @Column("AUTOR") String titulo;
    private @Column("FECHA_PUB") Date fecha_pub;
    private @Column("EMOCION") String emocion;

}
