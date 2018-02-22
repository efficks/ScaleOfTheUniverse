var objects = [
    {url:"images/human.png",size:176}
];
var circles = [
];
for(i = -24; i<=35; i++) {
    circles.push(
        {size:Math.pow(1*10,i)}
    );
}

var opacityDown = d3.scaleLinear()
  .domain([1/1000, 1])
  .range([0, 1]);

  var opacityUp = d3.scaleLinear()
  .domain([1, 8])
  .range([1, 0]);


function zoomed() {
    d3.event.transform.x=0;
    d3.event.transform.y=0;

    text.text(d3.event.transform.k)

    g.transition().duration(500)
        .attr("opacity",function(o){
            size = o.size*d3.event.transform.k;
            if(size < 1)
            {
                return Math.max(0,opacityDown(o.size*d3.event.transform.k));
            }
            else
            {
                return Math.max(0,opacityUp(o.size*d3.event.transform.k));
            }
        })
        .attr("transform",function(d){
            return "scale("+Math.min(1000,d.size*d3.event.transform.k)+")";
        });

    groupObjects.transition().duration(500)
    .attr("opacity",function(o){
        size = o.size*d3.event.transform.k/100;
        if(size < 1)
        {
            return Math.max(0,opacityDown(size));
        }
        else
        {
            return Math.max(0,opacityUp(size));
        }
    })
        .attr("transform",function(d){
            return "scale("+Math.min(1000,d.size*d3.event.transform.k/100)+")";
        });
  }

var zoom = d3.zoom()
    .scaleExtent([1e-35, 10e23])
    .on("zoom", zoomed);

var svg = d3.select("body")
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", "-400 -400 800 800")
  .attr("preserveAspectRatio", "xMidYMid meet")
  .attr("shape-rendering","geometricPrecision")
  .call(zoom);

var text = svg.append("text")
  .attr("x", -350)
  .attr("y", -350)
  .attr("fill","red")
  .text("toto")

var rootGroup = svg.append("g");

var g = rootGroup.selectAll("g.circle")
    .data(circles)
    .enter().append("g")
    .attr("class","circle")
    .attr("transform",function(d){
        return "scale("+d.size+")";
    })
    .each(drawCircle);

function drawCircle(d) {
    var f = d3.format(".0e");

    d3.select(this).append("circle")
        .attr("cx", function(d){return 0;})
        .attr("cy", function(d){return 0;})
        .attr("r", function(d){return "100px";});

    d3.select(this).append("text")
        .attr("y", 120)
        .text(function(d){
            return f(d.size);
        });
}

var groupObjects = rootGroup.selectAll("g.object")
    .data(objects)
    .enter().append("g")
    .attr("class","object")
    .each(drawObject);

function drawObject(d) {
    d3.select(this).append("svg:image")
        .attr("xlink:href", function(d){return d.url;})
        .attr("x", function(d){return -200;})
        .attr("y", function(d){return -200;})
        .attr("height", function(d){return 100;})
        .attr("width", function(d){return 100;});
}