import React from "react";
import ArrowBottom from "../ArrowBottom/ArrowBottom";
import ArrowTop from "../ArrowTop/ArrowTop";
import "./styles.scss";

const SortArrows = () => {
  return (
    <div className="arrows-wrap">
      <ArrowTop />
      <ArrowBottom />
    </div>
  );
};

export default SortArrows;
