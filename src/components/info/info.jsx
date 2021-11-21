import React from "react";

export const Info = () => {
  const plotPath = (name) => `../../../visualizations/${name}`;
  const plots = [
    plotPath("ACT_vs_SAT.png"),
    plotPath("average_ACT_by_state.png"),
    plotPath("average_SAT_by_state.png"),
    plotPath("Avg_ACT_distribution_by_state.png"),
    plotPath("Avg_SAT_distribution_by_state.png"),
  ];
  return (
    <div>
      {plots.map((plot, key) => (
        <div key={key}>
          <img src={plot} />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
};
