var width = window.innerWidth - 5,
    height = window.innerHeight - 5,
    isInit = false;

var socket = io.connect('http://localhost:3001');


socket.on('news', function (data) {
    // console.log(data);
});


var anyEvent = jQuery.Event( "anyEvent" );
var LOGGING = false;
var dict = [];
var clustercount = 0;
//init();
//
//var send = function(event){
//    if(LOGGING)
//       console.log(event.type + ":", event);
//    var holder = {};
//
//    for(var attrib in event){
//        //console.log(attrib);
//        if(typeof event[attrib] === "string")
//            holder[attrib] = event[attrib];
//        if(typeof event[attrib] === "number")
//            holder[attrib] = event[attrib];
//        if(typeof event[attrib] === "boolean")
//            holder[attrib] = event[attrib];
//    }
//
//    var updateEvents = [];
//
//    var result = $.grep(dict, function(e, index){
//        if(e.text == event.type){
//            updateEvents.push(index);
//            return true;
//        } else{
//            return false;
//        }
//    }, this);
//
//    if(updateEvents.length != 0){
//        updateEvents.forEach(function(index){
//           dict[index].count++;
//           dict[index].radius = dict[index].count ;
//       }, this);
//    }
//    else {
//        var d = {
//            text: event.type,
//            count: 1,
//            cluster: clustercount,
//            radius: 2,
//            x: Math.cos(2 * Math.PI) * 200 + width / 2 + Math.random(),
//            y: Math.sin(2 * Math.PI) * 200 + height / 2 + Math.random()
//        };
//        clustercount++;
//        dict.push(d);
//    }
//    isInit ? isInit = true : init(dict);
//
//    $("body").trigger(anyEvent, [dict] );
//
//    socket.emit('windowEvent', holder);
//};
//
//function setupListener(element, index, array){
//    window[element] = send;
//}
//
//var events = [
//    "oncanplay",
//    "oncanplaythrough",
//    "onchange",
//    "onclose",
//    "oncontextmenu",
//    "oncuechange",
//    "ondblclick",
//    "ondevicemotion",
//    "ondeviceorientation",
//    "ondrag",
//    "ondragstart",
//    "ondragend",
//    "ondragleave",
//    "ondragover",
//    "ondrop",
//    "ondurationchange",
//    "onemptied",
//    "onended",
//    "onerror",
//    "onerrorupdate",
//    "onfocus",
//    "onhelp",
//    "onkeydown",
//    "onkeypress",
//    "onkeyup",
//    "onload",
//    "onmousedown",
//    "onmousemove",
//    "onmouseout",
//    "onmouseover",
//    "onmouseup",
//    "onpaste",
//    "oncut",
//    "onpropertychange",
//    "onreadystatechange",
//    "onreset",
//    "onresize",
//    "onresizeend",
//    "onresizestart",
//    "onrowenter",
//    "onrowexit",
//    "onrowsdelete",
//    "onrowsinserted",
//    "onscroll",
//    "onselect",
//    "onselectionchange",
//    "onselectstart",
//    "onstop",
//    "onsubmit",
//    "onautocomplete",
//    "onautocompleteerror",
//    "onbeforeunload",
//    "onblur",
//    "oncancel",
//    "onabort",
//    "onclick",
//    "onmouseenter",
//    "onmousedown",
//    "onmousemove",
//    "onwheel",
//    "onunload"
//];
//
//events.forEach(setupListener);
//$("body").on("anyEvent", wrapIt );

var width = window.innerWidth - 5,
    height = window.innerHeight -5,
    padding = 5, // separation between same-color nodes
    clusterPadding = 10, // separation between different-color nodes
    maxRadius = 12;
var svg = d3.select("#background-overlay").append("svg")
    .attr("width", width)
    .attr("height", height);

var n = 300, // total number of nodes
    m = 16; // number of distinct clusters

var color = d3.scale.category10()
    .domain(d3.range(m));

var clusters = new Array(m);
var fill = d3.scale.category20();
var nodes, node, text;
function init(data){
    nodes = d3.range(n).map(function() {
        var i = Math.floor(Math.random() * m),
            r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
            d = {
                text: "hey",
                cluster: i,
                radius: r,
                x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
                y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
            };
        if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
        return d;
    });

    var force = d3.layout.force()
        .nodes(nodes)
        .size([width, height])
        .gravity(0)
        .charge(2)
        .on("tick", tick)
        .start();

    node = svg.selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .style("fill", function(d) { return color(d.cluster); })
        .call(force.drag);

    node.transition()
            .duration(100)
            .delay(function(d, i) { return i * 5; })
            .attrTween("r", function(d) {
                var i = d3.interpolate(0, d.radius);
                return function(t) { return d.radius = i(t); };
            });

//    var text = svg.selectAll("text")
//        .data(nodes)
//        .enter().append("text")
//        .attr("x", function(d) { return d.x; })
//        .attr("y", function(d) { return d.y; })
//        .text( function (d) { return d.text; })
//        .attr("font-family", "sans-serif")
//        .attr("text-anchor", "middle")
//        .attr("font-size",function(d){ return d.radius + "px"})
//        .style("fill", function(d) { return color(d.cluster + 5); }).call(force.drag);

//    text.transition()
//            .duration(750)
//            .delay(function(d, i) { return i * 5; })
//            .attrTween("r", function(d) {
//                var i = d3.interpolate(0, d.radius);
//                return function(t) { return d.radius = i(t); };
//            });

    function tick(e) {
    //        console.log(e);
        node
            .each(cluster(10 * e.alpha * e.alpha))
            .each(collide(.5))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
//        text
//            .each(cluster(10 * e.alpha * e.alpha))
//            .each(collide(.5))
//            .attr("x", function(d) { return d.x; })
//            .attr("y", function(d) { return d.y; });
    }
    isInit = true
}
// Move d to be adjacent to the cluster node.
function cluster(alpha) {
    return function(d) {
        var cluster = clusters[d.cluster];
        if (cluster === d) return;
        var x = d.x - cluster.x,
            y = d.y - cluster.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + cluster.radius;
        if (l != r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            cluster.x += x;
            cluster.y += y;
        }
    };
}

// Resolves collisions between d and all other circles.
function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== d)) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                if (l < r) {
                    l = (l - r) / l * alpha;
                    d.x -= x *= l;
                    d.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
    };
}

function wrapIt(event, datastore) {
//console.log(datastore);
//    var hey = d3.selectAll("text");
//    var hey2 = d3.selectAll("circle");
//    hey.transition()
////        .data(datastore)
//        .duration(100)
//        .delay(function(d, i) { return 0; })
//        .attr("font-size",function(d){ return d.count/8 + "px"});
//        .attr("x", function(d) { return d.x; })
//        .attr("y", function(d) { return d.y; })
//        .attrTween("r", function(d) {
//            var i = d3.interpolate(0, d.radius);
//            return function(t) { return d.radius = i(t) > 5 ? i(t) : 5; };
//        });
////

//    node.transition()

//        .duration(100)
////        .delay(function(d, i) { return i; })
//        .attr("r",function(d){
//            return d.radius * 1.75 < maxRadius ? d.radius * 1.75 : maxRadius;
//        } )
//        .attrTween("r", function(d) {
//            var i = d3.interpolate(10, Math.floor(Math.random() * 20));
//            return function(t) { return d.radius = i(t); };
//        });
//    node;
}