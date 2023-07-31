import style from "./App.module.css"
import Router from './router/Router';



function App() {
  return (
    <div>
      <Router />
      {/* <hr className={style.App_hr}/> */}
      <div className={style.Footer}>
        <p className={style.App_Footer_name}>타티</p>
        <div className={style.App_Footer_text}>
          <p className={style.App_Footer_name_text}>이용약관</p>
          <p className={style.App_Footer_name_text}>개인정보처리방침</p>
          <p className={style.App_Footer_name_text}>서비스소개</p>
        </div>
      </div>
    </div>
  );
}

export default App;
