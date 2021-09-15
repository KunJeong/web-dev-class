// set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 30, left: 40 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3
  .select("#my_dataviz")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// get the data
d3.csv(
  "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_doubleHist.csv"
).then(function (data) {
  // X axis: scale and draw:
  const x = d3
    .scaleLinear()
    .domain([-4, 9]) // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
    .range([0, width]);
  svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // set the parameters for the histogram
  const histogram = d3
    .histogram()
    .value(function (d) {
      return +d.value;
    }) // I need to give the vector of value
    .domain(x.domain()) // then the domain of the graphic
    .thresholds(x.ticks(40)); // then the numbers of bins

  // And apply twice this function to data to get the bins.
  const bins1 = histogram(
    data.filter(function (d) {
      return d.type === "variable 1";
    })
  );
  const bins2 = histogram(
    data.filter(function (d) {
      return d.type === "variable 2";
    })
  );

  // Y axis: scale and draw:
  const y = d3.scaleLinear().range([height, 0]);
  y.domain([
    0,
    d3.max(bins1, function (d) {
      return d.length;
    }),
  ]); // d3.hist has to be called before the Y axis obviously
  svg.append("g").call(d3.axisLeft(y));

  // append the bars for series 1
  svg
    .selectAll("rect")
    .data(bins1)
    .join("rect")
    .attr("x", 1)
    .attr("transform", function (d) {
      return `translate(${x(d.x0)} , ${y(d.length)})`;
    })
    .attr("width", function (d) {
      return x(d.x1) - x(d.x0) - 1;
    })
    .attr("height", function (d) {
      return height - y(d.length);
    })
    .style("fill", "#69b3a2")
    .style("opacity", 0.6);

  d3.select("#select").on("change", function (d) {
    onChange(this.value);
  });

  function onChange(value) {
    // append the bars for series 2
    console.log(value);
    const data = value == "A" ? bins1 : bins2;
    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .transition()
      .duration("1000")
      .attr("x", 1)
      .attr("transform", function (d) {
        return `translate(${x(d.x0)}, ${y(d.length)})`;
      })
      .attr("width", function (d) {
        return x(d.x1) - x(d.x0) - 1;
      })
      .attr("height", function (d) {
        return height - y(d.length);
      })
      // .style("fill", "#404080")
      .style("opacity", 0.6);
  }
});
