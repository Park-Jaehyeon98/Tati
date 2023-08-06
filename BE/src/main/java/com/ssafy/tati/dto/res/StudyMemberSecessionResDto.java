package com.ssafy.tati.dto.res;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "스터디 탈되 ResDto")
public class StudyMemberSecessionResDto {
    @Schema(description = "회원 닉네임")
    private String memberNickName;
    @Schema(description = "스터디 이름")
    private String studyName;
}
