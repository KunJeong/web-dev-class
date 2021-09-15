// // set the dimensions and margins of the graph
// const margin = { top: 10, right: 20, bottom: 30, left: 50 },
//   width = 500 - margin.left - margin.right,
//   height = 420 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// const svg = d3
//   .select("#my_dataviz")
//   .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);

// const x = d3.scaleLinear().domain([0, 12000]).range([0, width]);
// const xAxis = svg.append("g").attr("transform", `translate(0, ${height})`);

// xAxis.call(d3.axisBottom(x));

// // Add Y axis
// const y = d3.scaleLinear().domain([35, 90]).range([height, 0]);
// svg.append("g").call(d3.axisLeft(y));

// function onClick() {
//   const newX = d3.scaleSqrt().domain([0, 3000]).range([0, width]);
//   xAxis.transition().duration(2000).call(d3.axisBottom(newX));
// }

var myData = [
  { key: 1, value: 30 },
  { key: 2, value: 20 },
  { key: 3, value: 50 },
  { key: 4, value: 70 },
];
var myData2 = [
  { key: 1, value: 20 },
  { key: 3, value: 50 },
  { key: 4, value: 30 },
];

xscale = d3.scaleLinear().domain([0, 2]).range([100, 400]);

// 0->100, 50->250, 100->400,

d3.select("#my_dataviz")
  .selectAll("circle")
  .data(myData, function (d) {
    return d.value;
  })
  .join("circle")
  .attr("cx", function (d, i) {
    return xscale(i);
  })
  .attr("r", function (d) {
    return d.value;
  }) //f
  .attr("cy", 100);

function onClick() {
  d3.select("#my_dataviz")
    .selectAll("circle")
    .data(myData2, function (d) {
      return d.value;
    })
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("fill", "green")
          .attr("cy", 100)

          .attr("cx", function (d, i) {
            return xscale(i);
          })
          .transition()
          .duration(2000)
          .attr("r", function (d) {
            return d.value;
          }),
      (update) =>
        update
          .transition()
          .attr("cx", function (d, i) {
            return xscale(i);
          })
          .attr("r", function (d) {
            return d.value;
          }) //f
          .attr("cy", 100)
          .attr("fill", "blue"),
      (exit) => exit.transition().duration(1000).style("opacity", 0)
    );
}
