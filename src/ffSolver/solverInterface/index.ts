import { ArraySlice } from "../../logic/stateUpdaters/arraySlice";
import { BipartiteGraph } from "../src/matchingWithFF";
import { SingleAdjacencyList } from "../src/utils";
import { numbersAreCoprime } from "../../logic/utils";
import { concat } from "lodash";

/**
 * Generates a bipartite flow graph using the two sets of
 * numbers in an ArraySlice object, placing an edge between
 * each pair of coprime numbers.
 */
export const createGraphFromNumberSets = (
  arraySlice: ArraySlice
): BipartiteGraph => {
  const { setA, setB } = arraySlice;

  // The lists of the respective indices for the number sets
  const setAIndices = setA.map((_num, index) => index + 1);
  const setBIndices = setB.map((_num, index) => setA.length + 1 + index);

  // Get first node of graph: the 'source' node connected to each number in setA
  const startingEdges = setA.map((_num, index) => [setAIndices[index], 1]);
  const firstNode = { vertex: 0, edgesAndCapacities: startingEdges };
  const finalEdges = setB.map((_num, index) => [setBIndices[index], 0]);
  const finalNode = {
    vertex: setA.length + setB.length + 1,
    edgesAndCapacities: finalEdges,
  };

  // Get the partial adjacency lists for setA and setB
  const adjacencyListA: SingleAdjacencyList[] = setA.map((_num, index) => {
    return {
      vertex: setAIndices[index],
      edgesAndCapacities: [[firstNode.vertex, 0]],
    };
  });
  const adjacencyListB: SingleAdjacencyList[] = setB.map((_num, index) => {
    return {
      vertex: setBIndices[index],
      edgesAndCapacities: [[finalNode.vertex, 1]],
    };
  });
  for (let i = 0; i < setA.length; i++) {
    for (let j = 0; j < setB.length; j++) {
      if (numbersAreCoprime(setA[i], setB[j])) {
        adjacencyListA[i].edgesAndCapacities.push([setBIndices[j], 1]);
        adjacencyListB[j].edgesAndCapacities.push([setAIndices[i], 0]);
      }
    }
  }
  const adjacencyList = concat([firstNode], adjacencyListA, adjacencyListB, [
    finalNode,
  ]);
  return {
    startNode: firstNode.vertex,
    endNode: finalNode.vertex,
    adjacencyList,
    setA: setAIndices,
    setB: setBIndices,
  };
};
