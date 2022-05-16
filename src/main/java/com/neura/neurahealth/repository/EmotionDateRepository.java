package com.neura.neurahealth.repository;

import com.neura.neurahealth.model.EmotionDateTable;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

public interface EmotionDateRepository extends CrudRepository<EmotionDateTable,Long> {
    @Modifying
    @Query("DELETE FROM EMOTIONDATES WHERE USER_ID= :id")
    void deleteByUserId(Long id);
}
