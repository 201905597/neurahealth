package com.neura.neurahealth.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmotionDateDTO {
    private String emotionName;
    private Date fecha;
    private Long userId;
}
