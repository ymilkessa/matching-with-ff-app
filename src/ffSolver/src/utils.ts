/**
 * 1. Adjacency list used to represent graphs
 * 2. Another adjacency list used to denote edges
 *    going out of a node, along with the flow capacities.
 */

export interface SingleAdjacencyList {
  vertex: number;
  edgesAndCapacities: number[][];
}

export interface FlowGraph {
  //   flow: number;
  startNode: number;
  endNode: number;
  adjacencyList: SingleAdjacencyList[];
}

/**
 * Returns a list of paths for a graph
 */
export const getListOfPaths = (graph: FlowGraph): number[][] => {
  const allPaths: number[][] = [];
  const { startNode, endNode, adjacencyList } = graph;
  const partialPaths: number[][] = [[startNode]];
  // While partialPaths is not empty
  while (partialPaths.length) {
    // Pop out a path.
    const nextPath = partialPaths.pop();
    if (!nextPath) {
      throw Error("Error occured while enumerating paths in graph");
    }
    // Get the last item in the path
    const lastVertex = nextPath.slice(-1)[0];
    // Fetch the nodes adjacent to this path AND which are not yet in the path.
    const adjList =
      adjacencyList.find((adjList) => adjList.vertex === lastVertex)
        ?.edgesAndCapacities ?? [];
    const nextNodes = adjList.filter(
      (edgeNCapacity) => !nextPath.includes(edgeNCapacity[0])
    );
    // For each adjacent vertex that is new:
    for (let k = 0; k < nextNodes.length; k++) {
      // Make a copy of path and add the new vertex to it.
      const newPath = [...nextPath, nextNodes[k][0]];
      nextNodes[k][0] === endNode
        ? allPaths.push(newPath)
        : partialPaths.unshift(newPath);
    }
  }
  return allPaths;
};

/**
 * Returns true if the given path can be added to the residual graph.
 * Returns false if otherwise.
 */
export const isThisPathPossible = (
  graph: FlowGraph,
  path: number[]
): boolean => {
  if (!path.length) {
    return false;
  }
  // Return false if any node is repeated
  if (new Set(path).size !== path.length) return false;
  // Check if there is room for flow in each edge
  for (let k = 0; k < path.length - 1; k++) {
    // If the mid-path vertex here is the endNode, return false;
    if (path[k] === graph.endNode) return false;
    const adjList = graph.adjacencyList.find(
      (adjListObj) => adjListObj.vertex === path[k]
    );
    // If this node doesn't exist, return false
    if (!adjList) return false;
    // Now return false if the residual capacity is 0
    const edgeAndCapacity = adjList.edgesAndCapacities.find(
      (edgeCap) => edgeCap[0] === path[k + 1]
    );
    // Return false if there is no edge b/n these two nodes, or the capacity is 0
    if (!edgeAndCapacity || !edgeAndCapacity[1]) {
      return false;
    }
  }
  // Return false if the last vertex is not the endNode
  if (path[path.length - 1] !== graph.endNode) {
    return false;
  }
  // Return true if all conditions pass
  return true;
};
