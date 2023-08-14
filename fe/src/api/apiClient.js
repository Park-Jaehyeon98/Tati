import axios from "axios";
import jwt_decode from "jwt-decode";

export const apiClient = axios.create({
  baseURL: "https://i9b305.p.ssafy.io/api",
  // baseURL: "http://192.168.31.57:8080",
  // baseURL: "http://localhost:8080",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
    RefreshToken: localStorage.getItem("refreshtoken"),
  },
});

export const tokenRefresh = () => {
  const now = new Date();
  const tokenInfo = localStorage.getItem("decodedToken");
  const parseJwt = JSON.parse(tokenInfo);
  const exp = parseJwt.exp;

  if (exp < now.getTime() / 1000) {
    console.log(exp);
    console.log(now.getTime() / 1000);
    // iat가 exp보다 작은 경우에만 재발급 로직 수행
    axios
      .get(`${process.env.REACT_APP_URL}/member/reissue`, {
        headers: {
          // Authorization: "Bearer " + localStorage.getItem("accessToken"),
          RefreshToken: localStorage.getItem("refreshtoken"),
        },
      })
      .then((res) => {
        console.log("액세스 토큰 재발급 완료:", res);
        // 재발급된 액세스 토큰을 받아와서 사용
        const newAccessToken = res.headers.authorization.substring(7);
        // TODO: 재발급된 액세스 토큰을 어딘가에 저장하여 사용
        localStorage.setItem("accessToken", newAccessToken);
        const decodedToken = jwt_decode(newAccessToken);
        localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
      })
      .catch((err) => {
        console.log("액세스 토큰 재발급 실패:", err);
      });
  } else {
    console.log("이건좀 ㅋ");
  }
};
