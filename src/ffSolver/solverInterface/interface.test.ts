import { concat, isEqual, range } from "lodash";
import { createGraphFromNumberSets, matchCoprimesWithFF } from "./interface";
import { BipartiteGraph } from "../src/matchingWithFF";

describe("Test interface functions", () => {
  let graphCreated: BipartiteGraph;
  let sampleProblem: any;

  // Only possible coprime matching for the sample is:
  // 91, 12
  // 65, 42
  // 28, 39
  // 15, 26

  beforeAll(() => {
    sampleProblem = {
      setA: [65, 91, 28, 15],
      setB: [12, 26, 39, 42],
    };
    graphCreated = createGraphFromNumberSets(sampleProblem);
  });

  it("Assigns correct indices to the numbers in the sets.", () => {
    expect(isEqual(graphCreated.setA, range(1, 5))).toBe(true);
    expect(isEqual(graphCreated.setB, range(5, 9))).toBe(true);
  });

  it("The adjacency lists for the first set are accurate.", () => {
    const setAList = graphCreated.adjacencyList.slice(
      1,
      sampleProblem.setA.length + 1
    );
    const expectedListPortions: number[][][] = [
      [
        [5, 1],
        [8, 1],
      ],
      [[5, 1]],
      [[7, 1]],
      [[6, 1]],
    ];
    setAList.forEach((node, index) => {
      expect(
        isEqual(
          new Set(node.edgesAndCapacities),
          new Set(concat(expectedListPortions[index], [[0, 0]]))
        )
      ).toBe(true);
    });
  });

  it("The adjacency lists for the second set are accurate.", () => {
    const setBList = graphCreated.adjacencyList.slice(
      sampleProblem.setA.length + 1,
      sampleProblem.setA.length + sampleProblem.setB.length + 1
    );
    const expectedListPortions: number[][][] = [
      [
        [1, 0],
        [2, 0],
      ],
      [[4, 0]],
      [[3, 0]],
      [[1, 0]],
    ];
    setBList.forEach((node, index) => {
      expect(
        isEqual(
          new Set(node.edgesAndCapacities),
          new Set(concat(expectedListPortions[index], [[9, 1]]))
        )
      ).toBe(true);
    });
  });

  it("The ford-fulkerson solver returns a valid matching.", () => {
    const { setAMatches, setBMatches, arrayOfMatches } =
      matchCoprimesWithFF(sampleProblem);
    const expectedMatchings = [
      [1, 0],
      [0, 3],
      [2, 2],
      [3, 1],
    ];
    const expectedSetA = [3, 0, 2, 1];
    const expectedSetB = [1, 3, 2, 0];
    expect(isEqual(new Set(arrayOfMatches), new Set(expectedMatchings))).toBe(
      true
    );
    expect(isEqual(expectedSetA, setAMatches)).toBe(true);
    expect(isEqual(expectedSetB, setBMatches)).toBe(true);
  });
});
