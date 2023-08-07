import Router from './router/Router';
import Header from "./Header";
import Footer from './Footer';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Router />
        {/* <hr className={style.App_hr}/> */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
