import React, { useState } from "react";
import "../css/assets/YesNo.css";
import Kspinner from "./Kspinner";
function YesNo({ DeleteNoun, DeleteText, OnYesDelete, OnNoDelete }) {
  return (
    <div className="Main-yesno">
      <div className="yesno">
        <h1>are you sure</h1>
        <p>
          pls comfim! {DeleteText} <span>{DeleteNoun}</span>
        </p>
        <div className="yesno-btns">
          <button className="yesno-btn" onClick={OnYesDelete}>
            yes
          </button>
          <button className="yesno-btn" onClick={OnNoDelete}>
            no
          </button>
        </div>
      </div>
    </div>
  );
}

export default YesNo;
