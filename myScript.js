// 02-D3.js Setup
// var headerID=d3.select('#headerID')
// console.log(headerID.text());
// headerID.text("D3 Setup has been compoleted");

// 03- Selection Functions
var selection=d3.selectAll("div");
selection.filter(function(d,i) {return true;}).select("p").text("Updated");