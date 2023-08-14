const hoverLine = {
  id: "line",
  beforeDatasetDraw(chart) {
    const {
      ctx,
      tooltip,
      chartArea: { top, bottom },
    } = chart;
    // console.log(tooltip._active);
    if (tooltip._active[0]) {
      ctx.beginPath();
      ctx.strokeStyle = "grey";
      ctx.lineWidth = 1;
      ctx.moveTo(tooltip._active[0].element.x, top);
      ctx.lineTo(tooltip._active[0].element.x, bottom);
      ctx.stroke();
      ctx.restore();
    }
  },
};
export default hoverLine;
