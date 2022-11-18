import React from "react";
import "./TrendCard.css";

import { TrendsData } from "../../Data/TrendsData";

const TrendCard = () => {
  return (
    <div className="trendCard">
      <h3>Trends for you</h3>
      {TrendsData.map((trend) => {
        return (
          <div className="trend" key={trend.name} >
            <span><b>#{trend.name}</b></span>
            <span> {trend.shares}k shares</span>
          </div>
        )
      })}
    </div>
  );
};

export default TrendCard;
