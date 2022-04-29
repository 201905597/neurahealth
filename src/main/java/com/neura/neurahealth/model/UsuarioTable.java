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
@Table("USUARIOS")
public class UsuarioTable {
    private @Column("ID") @Id Long id;
    private @Column("USER_DATA") String userData;
    private @Column("USER_NAME") String userName;
    private @Column("USER_PWD") String userPwd;
    private @Column("ID_PSIC") Long idPsic;
}
