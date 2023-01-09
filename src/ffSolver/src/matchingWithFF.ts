import { FlowGraph, getListOfPaths, isThisPathPossible } from "./utils";

/**
 * A flow graph representation of a matching problem.
 * Has an array of indices for each set in the bipartite graph.
 */
export interface BipartiteGraph extends FlowGraph {
  /**
   * Contains the indices (for the adjacency list) for the first set
   */
  setA: number[];
  setB: number[];
}

export class MatchingWithFF {
  public graph: BipartiteGraph;
  private paths: number[][];
  private maxCapacity: number;
  private currentFlow: number;

  constructor(graph: BipartiteGraph) {
    this.graph = graph;
    this.paths = [];
    this.maxCapacity = this.getMatchingCapacity();
    this.currentFlow = 0;
  }

  public execute() {
    this.completeFlowForMatching();
    return this.getMatchingFromFlowGraph();
  }

  /**
   * Get the matchings represented in the current state of the flow graph
   */
  public getMatchingFromFlowGraph() {
    const matchings: number[][] = [];
    for (let k = 0; k < this.graph.setA.length; k++) {
      const vertex = this.graph.setA[k];
      // TODO: make this faster by using indices in sets A and B
      const edgeNCapacityPair = this.graph.adjacencyList[
        vertex
      ].edgesAndCapacities.find(
        (eNC) => eNC[1] === 0 && eNC[0] !== this.graph.startNode
      );
      if (!edgeNCapacityPair) continue;
      matchings.push([vertex, edgeNCapacityPair[0]]);
    }
    return matchings;
  }

  public completeFlowForMatching() {
    this.paths = getListOfPaths(this.graph);
    let loops = 0;
    while (this.currentFlow < this.maxCapacity) {
      // Check each startNode in setA
      for (let k = 0; k < this.graph.setA.length; k++) {
        const pathsStartingWithN = this.paths.filter(
          (path) => path[1] === this.graph.setA[k]
        );
        const someViablePath = pathsStartingWithN.find((path) =>
          isThisPathPossible(this.graph, path)
        );
        if (someViablePath) {
          this.augmentPathToGraph(someViablePath);
          if (this.currentFlow === this.maxCapacity) break;
        }
      }
      if (loops > 3) {
        throw Error("completeMatching wouldn't end after 4 loops");
      }
      loops += 1;
    }
    // Note: You should have a complete matching here...
  }

  /**
   * Adds the given path to the flow graph, updating
   * the residual capacities along the way.
   */
  private augmentPathToGraph(path: number[]) {
    if (!isThisPathPossible(this.graph, path)) {
      return;
    }
    // Update all the forward edges
    for (let k = 0; k < path.length - 1; k++) {
      const adjList = this.graph.adjacencyList[path[k]];
      const edgeIndex = adjList?.edgesAndCapacities.findIndex(
        (edgeNCapacity) => edgeNCapacity[0] === path[k + 1]
      );
      if (adjList?.edgesAndCapacities && edgeIndex !== undefined) {
        adjList.edgesAndCapacities[edgeIndex][1] =
          adjList?.edgesAndCapacities[edgeIndex][1] ^ 1;
      } else {
        throw Error;
      }
    }
    // Update all the residual edges
    for (let k = 1; k < path.length; k++) {
      const adjList = this.graph.adjacencyList[path[k]];
      const edgeIndex = adjList?.edgesAndCapacities.findIndex(
        (edgeNCapacity) => edgeNCapacity[0] === path[k - 1]
      );
      if (adjList?.edgesAndCapacities && edgeIndex !== undefined) {
        adjList.edgesAndCapacities[edgeIndex][1] =
          adjList?.edgesAndCapacities[edgeIndex][1] ^ 1;
      } else {
        throw Error;
      }
    }
    this.currentFlow = this.getCurrentFlow();
  }

  public getMatchingCapacity() {
    return this.graph.setA.length <= this.graph.setB.length
      ? this.graph.setA.length
      : this.graph.setB.length;
  }

  public getCurrentFlow() {
    const endNodeList = this.graph.adjacencyList[this.graph.endNode];
    const capacities =
      endNodeList?.edgesAndCapacities
        .filter((edgeNCapacity) => edgeNCapacity[1])
        .map((edgeNCapacity) => edgeNCapacity[1]) ?? [];
    let currentFlow = 0;
    for (let k = 0; k < capacities.length; k++) {
      currentFlow += capacities[k];
    }
    return currentFlow;
  }
}
