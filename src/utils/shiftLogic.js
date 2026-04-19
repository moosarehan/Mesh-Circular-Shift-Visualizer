/** 
 * Mesh Circular Shift Logic Module
 * Implements Stage 1 (Row Shift) and Stage 2 (Column Shift)
 */

export const getGridCoords = (index, sqrtP) => {
  return {
    row: Math.floor(index / sqrtP),
    col: index % sqrtP,
  };
};

export const getIndexFromCoords = (row, col, sqrtP) => {
  // Ensure wrap-around logic
  const r = (row + sqrtP) % sqrtP;
  const c = (col + sqrtP) % sqrtP;
  return r * sqrtP + c;
};

export const getShiftAmounts = (q, sqrtP) => {
  return {
    rowShift: q % sqrtP,
    colShift: Math.floor(q / sqrtP),
  };
};

export const calculateMeshSteps = (q, sqrtP) => {
  const { rowShift, colShift } = getShiftAmounts(q, sqrtP);
  return rowShift + colShift;
};

export const calculateRingSteps = (q, p) => {
  return Math.min(q, p - q);
};

export const getTargetIndex = (currentIndex, q, p) => {
  return (currentIndex + q) % p;
};

/**
 * Simulation of the two-stage shift
 * This helps the UI track intermediate states
 */
export const simulateTwoStages = (p, q) => {
  const sqrtP = Math.sqrt(p);
  const { rowShift, colShift } = getShiftAmounts(q, sqrtP);
  
  const initialState = Array.from({ length: p }, (_, i) => ({
    id: i,
    value: `D${i}`,
    r: Math.floor(i / sqrtP),
    c: i % sqrtP
  }));

  // Stage 1: Row Shift
  const stage1State = initialState.map((node) => {
    const newCol = (node.c + rowShift) % sqrtP;
    return { ...node, c: newCol, stage: 1 };
  });

  // Stage 2: Column Shift
  const stage2State = stage1State.map((node) => {
    const newRow = (node.r + colShift) % sqrtP;
    return { ...node, r: newRow, stage: 2 };
  });

  return { initialState, stage1State, stage2State };
};
