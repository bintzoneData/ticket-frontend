import React from "react";
import { useNavigate } from "react-router-dom";

function ButtonBack({ url }) {
  const navigate = useNavigate();
  return (
    <button
      className="all-btn-submit  all-fz-18px  all-B-navy "
      onClick={() => navigate(url)}
    >
      back
    </button>
  );
}

export default ButtonBack;
