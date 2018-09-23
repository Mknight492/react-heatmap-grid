import React from "react";
import PropTypes from "prop-types";
import XLabels from "./XLabels";
import DataGrid from "./DataGrid";

function HeatMap({
  xLabels,
  yLabels,
  data,
  background,
  height,
  xLabelWidth,
  xLabelsLocation,
  yLabelTextAlign,
  xLabelsVisibility,
  unit,
  displayYLabels,
  onClick,
  squares,
  cellRender,
  cellStyle,
}) {
  let cursor = "";
  if (onClick !== undefined) {
    cursor = "pointer";
  }
  const xLabelsEle = (
    <XLabels
      labels={xLabels}
      width={xLabelWidth}
      labelsVisibility={xLabelsVisibility}
      height={height}
      squares={squares}
    />
  );
  return (
    <div>
      {xLabelsLocation === "top" && xLabelsEle}
      <DataGrid
        {...{
          xLabels,
          yLabels,
          data,
          background,
          height,
          xLabelWidth,
          yLabelTextAlign,
          unit,
          xLabelsLocation,
          displayYLabels,
          onClick,
          cursor,
          squares,
          cellRender,
          cellStyle,
        }}
      />
      {xLabelsLocation === "bottom" && xLabelsEle}
    </div>
  );
}

HeatMap.propTypes = {
  xLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  yLabels: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.array).isRequired,
  background: PropTypes.string,
  height: PropTypes.number,
  xLabelWidth: PropTypes.number,
  xLabelsLocation: PropTypes.oneOf(["top", "bottom"]),
  xLabelsVisibility: PropTypes.arrayOf(PropTypes.bool),
  yLabelTextAlign: PropTypes.string,
  displayYLabels: PropTypes.bool,
  unit: PropTypes.string,
  onClick: PropTypes.func,
  squares: PropTypes.bool,
  cellRender: PropTypes.func,
  cellStyle: PropTypes.func,
};

HeatMap.defaultProps = {
  background: "#329fff",
  height: 30,
  xLabelWidth: 60,
  yLabelTextAlign: "right",
  unit: "",
  xLabelsLocation: "top",
  xLabelsVisibility: null,
  displayYLabels: true,
  onClick: undefined,
  squares: false,
  cellRender: () => <span>&nbsp;</span>,
  cellStyle: (background, value, min, max) => ({
    background,
    opacity: (value - min) / (max - min) || 0,
  })
};

export default HeatMap;
