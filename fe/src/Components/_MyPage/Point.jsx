import React, { useState } from "react";
import Charge from "./Charge";
import Withdraw from "./Withdraw";
import PointHistory from "./PointHistory";

import style from "./Point.module.css"

export default function Point() {
  const [activeTab, setActiveTab] = useState("charge"); // Default active tab is "charge"

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={style.point}>
      <nav className={style.point_nav_btn}>
        <button className={style.nav_btn} onClick={() => handleButtonClick("charge")}>충전</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("withdraw")}>인출</button>
        <button className={style.nav_btn} onClick={() => handleButtonClick("history")}>내역</button>
      </nav>

      <div className={style.content}>
        {activeTab === "charge" && <Charge />}
        {activeTab === "withdraw" && <Withdraw />}
        {activeTab === "history" && <PointHistory />}
      </div>
    </div>
  );
}
