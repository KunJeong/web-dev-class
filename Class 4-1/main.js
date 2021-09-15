const zoom = d3.zoom().on("zoom", function (e) {
  console.log(e.transform);
  svg.attr("transform", e.transform);
});

const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500)
  .append("g");

svg.call(
  zoom

  // .on("end", function (e) {
  //   console.log("end");
  //   svg.style("background-color", "red");
  // })
);

svg
  .append("circle")
  .attr("cx", 200)
  .attr("cy", 200)
  .attr("r", 50)
  .style("fill", "blue");

function onClick() {
  zoom.scaleTo(svg, 1);
  // svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
}
