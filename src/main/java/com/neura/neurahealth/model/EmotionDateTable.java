package com.neura.neurahealth.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.sql.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table("EMOTIONDATES")
public class EmotionDateTable {
    private @Column("ID") @Id Long id;
    private @Column("EMOTION_NAME") String emotionName;
    private @Column("FECHA") Date fecha;
    private @Column("USER_ID") Long userId;
}
