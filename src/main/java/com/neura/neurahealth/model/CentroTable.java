package com.neura.neurahealth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("CENTROS")
public class CentroTable {
    private @Column("EMPLOYER_ID") @Id Long employerId;
    private @Column("EMPLOYER_NAME") String employerName;
    private @Column("POSTAL_CODE") Long postalCode;
}


