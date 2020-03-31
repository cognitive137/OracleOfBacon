function Graph() {
  this.nodes = [];
  this.graph = {};
  this.end = null;
  this.start = null;
}

//Will be a problem if the actor does not exist in the data.
Graph.prototype.setStart = function(actor) {
  this.start = this.graph[actor];
  return this.start;
};

Graph.prototype.setEnd = function(actor) {
  this.end = this.graph[actor];
  return this.end;
};

Graph.prototype.addNode = function(n) {
  //Node in arr
  this.nodes.push(n);
  var title = n.value;
  //Node in has
  this.graph[title] = n;
};

Graph.prototype.getNode = function(actor) {
  var n = this.graph[actor];
  return n;
};
