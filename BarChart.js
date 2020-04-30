var salesData= [
    {Year: '2000', Qty:1000},
    {Year: '2001', Qty:2330},
    {Year: '2002', Qty:4540},
    {Year: '2003', Qty:5558},
    {Year: '2004', Qty:1239},
    {Year: '2005', Qty:4349},
    {Year: '2006', Qty:7039},
    {Year: '2007', Qty:4034},
    {Year: '2008', Qty:3035},
    {Year: '2009', Qty:2043},
    {Year: '2010', Qty:1035},
];

var svg=d3.select("#svg");

var padding={top:20, right:30, bottom:30, left:50};

// var colors=d3.schemeCategory20c;

var chartArea={
    "width": parseInt(svg.style("width"))-padding.left-padding.right,
    "height": parseInt(svg.style("height"))-padding.top-padding.bottom
};

var yScale = d3.scaleLinear()
    .domain([0,d3.max(salesData,function(d,i) {return d.Qty})])
    .range([chartArea.height,0]).nice();

var xScale = d3.scaleBand()
    .domain(salesData.map(function(d) {return d.Year}))
    .range([0, chartArea.width])
    .padding(.2);


// xAxis(x축 생성)
var xAxis = svg.append("g")
.classed("xAxis", true)
.attr(
    'transform', 'translate('+padding.left+', '+(chartArea.height+ padding.top)+')'
)
.call(d3.axisBottom(xScale));

// yAxis(y축 생성)
var yAxisFn=d3.axisLeft(yScale);
var yAxis=svg.append("g")
    .classed("yAxis", true)
    .attr(
        'transform', 'translate('+padding.left+','+padding.top+')'
    )
    yAxisFn(yAxis);

// 1000 단위 줄
var grid=svg.append("g")
.attr("class", "grid")
.attr(
    'transform', 'translate('+padding.left+','+padding.top+')'
)
.call(d3.axisLeft(yScale)
    .tickSize(-(chartArea.width))
    .tickFormat("")
)

// bars
var rectGrp=svg.append("g").attr(
    'transform', 'translate('+padding.left+','+padding.top+')'
);

rectGrp.selectAll("rect").data(salesData).enter()
    .append("rect")
    .attr("width", xScale.bandwidth())
    .attr("height", function (d,i) {
        return chartArea.height-yScale(d.Qty)
    })
    .attr("x", function (d,i) {
        return xScale(d.Year);
    })
    .attr("y", function (d,i) {
        return yScale(d.Qty);
    })
    // .attr("fill", function (d,i) {
    //     return colors[i];
    // })
