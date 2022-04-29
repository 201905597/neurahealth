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
@Table("PSICOLOGOS")
public class PsicologoTable {
    private @Column("ID") @Id Long id;
    private @Column("PSIC_NAME") String psicName;
    private @Column("PSIC_PWD") String psicPwd;
    private @Column("EMPLOYER_ID") Long employerId;
}

