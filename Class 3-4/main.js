// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv(
  "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
).then(function (data) {
  // Add X axis
  var x = d3.scaleLinear().domain([0, 4000]).range([0, width]);
  const xScale = svg.append("g").attr("transform", `translate(0, ${height})`);
  xScale.call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 500000]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  // Add dots
  const dots = svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .join("circle")
    .attr("cx", function (d) {
      return x(d.GrLivArea);
    })
    .attr("cy", function (d) {
      return y(d.SalePrice);
    })
    .attr("r", 3)
    .style("fill", "#69b3a2");
  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [460 - margin.left - margin.right, 400 - margin.top - margin.bottom],
    ])
    .on("end", update);
  svg.call(brush);

  function update(e, d) {
    const extent = e.selection;
    console.log(e.selection);

    const leftBoundary = x.invert(extent[0]);
    const rightBoundary = x.invert(extent[1]);

    x = d3
      .scaleLinear()
      .domain([leftBoundary, rightBoundary])
      .range([0, width]);

    xScale.transition().duration(1000).call(d3.axisBottom(x));
    dots
      .transition()
      .duration(1000)
      .attr("cx", function (d) {
        return x(d.GrLivArea);
      })
      .call(brush.clear);
    // dots.classed("selected", function (d) {
    //   return isSelected(extent, x(d.GrLivArea), y(d.SalePrice));
    // });
  }

  // function isSelected(extent, cx, cy) {
  //   return (
  //     extent[0][0] <= cx &&
  //     cx <= extent[1][0] &&
  //     extent[0][1] <= cy &&
  //     cy <= extent[1][1]
  //   );
  // }
});
