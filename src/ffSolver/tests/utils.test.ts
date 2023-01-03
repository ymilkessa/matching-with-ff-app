import { getListOfPaths, isThisPathPossible } from "../src/utils";
import { simpleFlowGraph } from "./samples";

describe("Text maximum flow with FF", () => {
  let graph: any;
  let paths: number[][];
  beforeAll(() => {
    graph = simpleFlowGraph;
    paths = getListOfPaths(graph);
  });

  it("getListOfPaths works correctly.", () => {
    // Ensure that you get the expected number of paths
    expect(paths.length).toBe(4);
    // Ensure that the start and end vertices are as expected
    expect(paths.every((path) => path[0] === graph.startNode)).toBe(true);
    expect(paths.every((path) => path[path.length - 1] === graph.endNode)).toBe(
      true
    );
    // Ensure that each path contains a node at most once
    expect(paths.every((path) => new Set(path).size === path.length));
  });

  it("isThisPathPossible works correctly.", () => {
    const regularPaths = paths.filter((path) => path.length === 4);
    const residualGraphPaths = paths.filter((path) => path.length > 4);
    expect(regularPaths.every((path) => isThisPathPossible(graph, path))).toBe(
      true
    );
    // Including a non-existent edge in graph returns false
    expect(isThisPathPossible(graph, [0, 1, 4, 2, 3, 5])).toBe(false);
    // Including a zero-capacity edge in a graph return false
    expect(
      residualGraphPaths.some((path) => isThisPathPossible(graph, path))
    ).toBe(false);
  });
});
