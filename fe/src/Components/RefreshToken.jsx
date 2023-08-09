import axios from 'axios';
import jwt_decode from "jwt-decode";


export default function RefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  // 로컬의 decodedToken 가져오기
  const tokenInfo = localStorage.getItem('decodedToken');
  const parseJwt = JSON.parse(tokenInfo);

  const exp = parseJwt.exp;
  const iat = parseJwt.iat;

  if (iat < exp) {
    // iat가 exp보다 작은 경우에만 재발급 로직 수행
    console.log(refreshToken)
    axios
      .get(`${process.env.REACT_APP_URL}/member/reissue`, {
        headers: {
          RefreshToken: refreshToken,
        },
      })
      .then((res) => {
        console.log('액세스 토큰 재발급 완료:', res);
        // 재발급된 액세스 토큰을 받아와서 사용
        const newAccessToken = res.data.access_token;
        // TODO: 재발급된 액세스 토큰을 어딘가에 저장하여 사용
        localStorage.setItem('accessToken', newAccessToken);
        const decodedToken = jwt_decode(newAccessToken);
        localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
      })
      .catch((err) => {
        console.log('액세스 토큰 재발급 실패:', err);
      });
  }
}
