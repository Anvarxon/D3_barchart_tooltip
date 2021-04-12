const chartContainer = document.getElementById("chart-container");
// Anvarkhon Khamzaev
const data = [
  ["A", 0.08167],
  ["B", 0.01492],
  ["C", 0.02782],
  ["D", 0.04253],
  ["E", 0.12702],
  ["F", 0.02288],
  ["G", 0.02015],
  ["H", 0.06094],
  ["I", 0.06966],
  ["J", 0.00153],
  ["K", 0.00772],
  ["L", 0.04025],
  ["M", 0.02406],
  ["N", 0.06749],
  ["O", 0.07507],
  ["P", 0.01929],
  ["Q", 0.00095],
  ["R", 0.05987],
  ["S", 0.06327],
  ["T", 0.09056],
  ["U", 0.02758],
  ["V", 0.00978],
  ["W", 0.0236],
  ["X", 0.0015],
  ["Y", 0.01974],
  ["Z", 0.00074],
];

const width = chartContainer.clientWidth;
const height = chartContainer.clientHeight;
const margin = { top: 70, right: 30, bottom: 50, left: 50 };
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const tooltip = d3.select("body").append("div").attr("class", "toolTip");
const tooltipel = document.querySelector(".toolTip");

const svg = d3
  .select(chartContainer)
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const gXAxis = graph
  .append("g")
  .attr("transform", `translate(0, ${graphHeight})`);

const gYAxis = graph.append("g");

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d[1])])
  .range([graphHeight, 0]);

const x = d3
  .scaleBand()
  .domain(data.map((item) => item[0]))
  .range([0, graphWidth])
  .paddingInner(0.2)
  .paddingOuter(0.2);

  const rects = graph.selectAll("rect").data(data);

  rects
    .enter()
    .append("rect")
    .attr("fill", "steelblue")
    .attr("width", x.bandwidth)
    .attr("height", (d) => graphHeight - y(d[1]))
    .attr("x", (d) => x(d[0]))
    .attr("y", (d) => y(d[1]))
    .on("mouseover", (event, d) => {
      tooltip
        .style(
          "left",
          event.path[0].getBoundingClientRect().x -
            tooltipel.clientWidth / 2 +
            event.path[0].getBoundingClientRect().width / 2 +
            "px"
        )
        .style("top", event.path[0].getBoundingClientRect().y - 75 + "px")
        .style("visibility", "visible")
      .html("Frequency: " + "<br>" + d[1]);
  })
  .on("mouseout", (d) => {
    tooltip.style("visibility", "hidden");
  });

const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y).tickFormat((d) => d);

gXAxis.call(xAxis);
gYAxis.call(yAxis);
gXAxis.selectAll("text").style("font-size", 14);

gYAxis.selectAll("text").style("font-size", 14);
