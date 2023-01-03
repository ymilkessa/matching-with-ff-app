import { cloneDeep } from "lodash";

import { MatchingWithFF } from "../src/matchingWithFF";
import { getListOfPaths } from "../src/utils";
import { bipartiteFlowGraph, completedFlowGraph } from "./samples";

describe("Test matchingWithFF", () => {
  let matchingObj: any;
  let paths: number[][];
  beforeAll(() => {
    paths = getListOfPaths(bipartiteFlowGraph);
  });

  beforeEach(() => {
    matchingObj = new MatchingWithFF(cloneDeep(bipartiteFlowGraph));
  });

  it("getMatchingCapacity returns the full expected flow capacity", () => {
    expect(matchingObj.getMatchingCapacity()).toBe(
      matchingObj.graph.setA.length
    );
    // Make the first set longer and see what happens
    matchingObj.graph.setA.push(6);
    expect(matchingObj.getMatchingCapacity()).toBe(
      matchingObj.graph.setB.length
    );
  });

  it("Flow gets incremented after adding a path to graph", () => {
    // Initial flow should be 0
    expect(matchingObj.getCurrentFlow()).toBe(0);
    // No change for an invalid path
    const invalidPath = [2, 3, 1, 4, 5];
    matchingObj.augmentPathToGraph(invalidPath);
    expect(matchingObj.getCurrentFlow()).toBe(0);
    // Flow increases after valid path
    const pathToAdd = paths[0];
    matchingObj.augmentPathToGraph(pathToAdd);
    expect(matchingObj.getCurrentFlow()).toBe(1);
  });

  it("Path augmenting changes residual capacity in relevant edges", () => {
    const validPath = paths[0];
    // Forward edges have capacity 1
    for (let k = 0; k < validPath.length - 1; k++) {
      const eNC =
        matchingObj.graph.adjacencyList[validPath[k]].edgesAndCapacities;
      const edge = eNC.find((edge: number[]) => edge[0] === validPath[k + 1]);
      expect(edge[1]).toBe(1);
    }
    // Backward edges have capacity 0
    for (let k = 1; k < validPath.length; k++) {
      const eNC =
        matchingObj.graph.adjacencyList[validPath[k]].edgesAndCapacities;
      const edge = eNC.find((edge: number[]) => edge[0] === validPath[k - 1]);
      expect(edge[1]).toBe(0);
    }
    // And now the opposite happens.
    matchingObj.augmentPathToGraph(validPath);
    for (let k = 0; k < validPath.length - 1; k++) {
      const eNC =
        matchingObj.graph.adjacencyList[validPath[k]].edgesAndCapacities;
      const edge = eNC.find((edge: number[]) => edge[0] === validPath[k + 1]);
      expect(edge[1]).toBe(0);
    }
    for (let k = 1; k < validPath.length; k++) {
      const eNC =
        matchingObj.graph.adjacencyList[validPath[k]].edgesAndCapacities;
      const edge = eNC.find((edge: number[]) => edge[0] === validPath[k - 1]);
      expect(edge[1]).toBe(1);
    }
  });

  it("The FF algorithm achieves the correct maximum flow", () => {
    const maxCapacity = matchingObj.getMatchingCapacity();
    matchingObj.completeFlowForMatching();
    expect(matchingObj.getCurrentFlow()).toBe(maxCapacity);
  });

  it("getMatchingsFromFlowGraph works correclty", () => {
    const completedMatching = new MatchingWithFF(completedFlowGraph);
    const matchings = completedMatching.getMatchingFromFlowGraph();
    expect(
      matchings.some((arr: number[]) => arr[0] === 2 && arr[1] === 3)
    ).toBe(true);
    expect(
      matchings.some((arr: number[]) => arr[0] === 1 && arr[1] === 4)
    ).toBe(true);
    expect(matchings.length).toBe(2);
  });

  it("The object correctly solves for the desired matchings", () => {
    const matchings = matchingObj.execute();
    expect(
      matchings.some((arr: number[]) => arr[0] === 2 && arr[1] === 3)
    ).toBe(true);
    expect(
      matchings.some((arr: number[]) => arr[0] === 1 && arr[1] === 4)
    ).toBe(true);
    expect(matchings.length).toBe(2);
  });
});
