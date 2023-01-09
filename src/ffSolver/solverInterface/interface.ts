import { ArraySlice } from "../../logic/stateUpdaters/arraySlice";
import { BipartiteGraph, MatchingWithFF } from "../src/matchingWithFF";
import { SingleAdjacencyList } from "../src/utils";
import { numbersAreCoprime } from "../../logic/utils";
import { concat, range } from "lodash";
import {
  Matching,
  MatchingRecords,
  UNMATCHED_MARKER,
} from "../../logic/stateUpdaters/matchingsSlice";

/**
 * Returns a vaid coprime matching of sets provided in the
 * ArraySlice object using the ford-fulkerson matcher
 */
export function matchCoprimesWithFF(arraySlice: ArraySlice): MatchingRecords {
  const bipartiteGraph = createGraphFromNumberSets(arraySlice);
  const ffMatcher = new MatchingWithFF(bipartiteGraph);
  const matchings = ffMatcher.execute();
  const offSetA = 1;
  const offSetB = arraySlice.setA.length + 1;
  const finalIndex = offSetB + arraySlice.setB.length;
  const filteredMatchings = matchings.filter(
    (pair) => pair[0] > 0 && pair[1] < finalIndex
  );
  const normalizedMatchings = filteredMatchings.map(
    (pair) => [pair[0] - offSetA, pair[1] - offSetB] as Matching
  );
  return getMatchingRecordFromMatching(
    normalizedMatchings,
    arraySlice.setA.length,
    arraySlice.setB.length
  );
}

/**
 * Create a matching record using the given matching in order
 * to match the data format of the matchingSlice state
 */
function getMatchingRecordFromMatching(
  matches: Matching[],
  setALength: number,
  setBLength: number
): MatchingRecords {
  const setAMatches = range(0, setALength).map((_num) => UNMATCHED_MARKER);
  const setBMatches = range(0, setBLength).map((_num) => UNMATCHED_MARKER);
  for (let k = 0; k < matches.length; k++) {
    const [inA, inB] = matches[k];
    setAMatches[inA] = inB;
    setBMatches[inB] = inA;
  }
  return {
    setAMatches,
    setBMatches,
    arrayOfMatches: matches,
  };
}

/**
 * Generates a bipartite flow graph using the two sets of
 * numbers in an ArraySlice object, placing an edge between
 * each pair of coprime numbers.
 */
export function createGraphFromNumberSets(
  arraySlice: ArraySlice
): BipartiteGraph {
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
}
