package com.ssafy.tati.dto.res;

import com.ssafy.tati.entity.Study;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "스터디 전체 리스트 RessDto")
public class StudyAllListResDto {

    @Schema(description = "스터디 식별번호")
    private Integer studyId;

    @Schema(description = "스터디 명")
    private String studyName;

    @Schema(description = "총 인원")
    private Integer totalMember;

    @Schema(description = "현재 인원")
    private Integer currentMember;

    @Schema(description = "공개 여부")
    private Boolean disclosure;

    @Schema(description = "이미지")
    private String imageUrl;


    public StudyAllListResDto(Study study) {
        this.studyId = study.getStudyId();
        this.studyName = study.getStudyName();
        this.totalMember = study.getTotalMember();
        this.currentMember = study.getStudyMemberList().size();
        this.disclosure = study.getDisclosure();
        this.imageUrl = study.getImg();
    }
    
}
