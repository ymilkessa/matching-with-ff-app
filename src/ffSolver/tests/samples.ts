export const simpleFlowGraph = {
  startNode: 0,
  endNode: 5,
  adjacencyList: [
    {
      vertex: 0,
      edgesAndCapacities: [
        [1, 1],
        [2, 1],
      ],
    },
    {
      vertex: 1,
      edgesAndCapacities: [
        [0, 0],
        [3, 1],
        [4, 1],
      ],
    },
    {
      vertex: 2,
      edgesAndCapacities: [
        [0, 0],
        [3, 1],
      ],
    },
    {
      vertex: 3,
      edgesAndCapacities: [
        [1, 0],
        [2, 0],
        [5, 1],
      ],
    },
    {
      vertex: 4,
      edgesAndCapacities: [
        [1, 0],
        [5, 1],
      ],
    },
    {
      vertex: 5,
      edgesAndCapacities: [
        [3, 0],
        [4, 0],
      ],
    },
  ],
};

export const bipartiteFlowGraph = {
  ...simpleFlowGraph,
  setA: [1, 2],
  setB: [3, 4],
};

export const completedFlowGraph = {
  startNode: 0,
  endNode: 5,
  setA: [1, 2],
  setB: [3, 4],
  adjacencyList: [
    {
      vertex: 0,
      edgesAndCapacities: [
        [1, 0],
        [2, 0],
      ],
    },
    {
      vertex: 1,
      edgesAndCapacities: [
        [0, 1],
        [3, 1],
        [4, 0],
      ],
    },
    {
      vertex: 2,
      edgesAndCapacities: [
        [0, 1],
        [3, 0],
      ],
    },
    {
      vertex: 3,
      edgesAndCapacities: [
        [1, 0],
        [2, 1],
        [5, 0],
      ],
    },
    {
      vertex: 4,
      edgesAndCapacities: [
        [1, 1],
        [5, 0],
      ],
    },
    {
      vertex: 5,
      edgesAndCapacities: [
        [3, 1],
        [4, 1],
      ],
    },
  ],
};
