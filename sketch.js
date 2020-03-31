var data;
var graph;
function preload() {
  data = loadJSON("kevinbacon.json");
}

function setup() {
  graph = new Graph();
  noCanvas();
  //console.log.apply(data);

  var movies = data.movies;

  for (var i = 0; i < movies.length; i++) {
    var movie = movies[i].title;
    var cast = movies[i].cast;
    var movieNode = new Node(movie);
    graph.addNode(movieNode);

    for (var j = 0; j < cast.length; j++) {
      var actor = cast[j];
      var actorNode = graph.getNode(actor);
      if (actorNode == undefined) {
        actorNode = new Node(actor);
      }
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    }
  }

  //var start = graph.setStart("Mickey Rourke");
  var start = graph.setStart("Rachel McAdams");
  var end = graph.setEnd("Kevin Bacon");

  console.log(graph);

  var queue = [];

  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    var current = queue.shift();
    console.log(current.value);
    //set start to kevin too, to test this.
    if (current == end) {
      console.log("Found " + current.value);
      break;
    }
    var edges = current.edges;
    for (var i = 0; i < edges.length; i++) {
      var neighbor = edges[i];
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }
}

var path = [];
path.push(end);
var next = end.parent;
while (next != null) {
  path.push(next);
  next = next.parent;
}

var txt = "";
for (var i = path.length - 1; i >= 0; i--) {
  var n = path[i];
  text += n.value + " -->";
}
createP(txt);
