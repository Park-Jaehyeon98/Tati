package com.ssafy.tati.dto.req;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "회원정보 수정 DTO")
public class PutMemberReqDto {
    @Schema(description = "회원 식별번호")
    private Integer memberId;

    @Schema(description = "닉네임")
    private String memberNickName;

    @Schema(description = "비밀번호")
    private String password;

}
