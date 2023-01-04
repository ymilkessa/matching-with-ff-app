import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../logic/store";
import "./StatusBoard.css";
import {
  addErrorMarksFromObjects,
  addSelectionMarker,
  moveCursorMarker,
} from "../../logic/stateUpdaters/markingsSlice";
import {
  UNMATCHED_MARKER,
  addMatching,
  // clearAllMatchings,
  unmatchBox,
} from "../../logic/stateUpdaters/matchingsSlice";
import { SET_NUMBERS } from "../../logic/constants";
import { numbersAreCoprime } from "../../logic/utils";
// import { min } from "lodash";
// import { generateSets } from "../../logic/stateUpdaters/arraySlice";
// import { GameSize } from "../../logic/stateUpdaters/gameSizeSlice";
import { BoxLocation } from "../NumberBox/types";
import { min } from "lodash";

type SelectionSnapshot = {
  selection: BoxLocation | null;
  currentlyMatching: boolean;
  newSelection: boolean;
  selectionTime: number;
};

let selectionSnapshot: SelectionSnapshot = {
  selection: null,
  currentlyMatching: false,
  newSelection: false,
  selectionTime: 0,
};

const StatusBoard = () => {
  // State to indicate if this is a match selection or something else
  const dispatch = useDispatch();
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const setsInOrder = [setA, setB];
  const { previousSelection, selection, selectionTime } = useSelector(
    (state: RootState) => state.virtualSelection
  );
  const { setAMatches, setBMatches, arrayOfMatches } = useSelector(
    (state: RootState) => state.matchings
  );
  const { setASize, setBSize } = useSelector(
    (state: RootState) => state.gameSettings
  );

  // Get the match value for this box
  const relevantMatches =
    selection &&
    (selection.row === SET_NUMBERS.SET_A ? setAMatches : setBMatches);
  const matchFromOtherSet = selection && relevantMatches?.[selection.index];
  const isCurrentBoxMatched =
    relevantMatches?.length && matchFromOtherSet !== UNMATCHED_MARKER;

  // Get the match value for the previous box
  const relevantMatchesOfPrevBox =
    previousSelection &&
    (previousSelection.row === SET_NUMBERS.SET_A ? setAMatches : setBMatches);
  const matchOfPrevBox =
    previousSelection && relevantMatchesOfPrevBox?.[previousSelection.index];
  const isPreviousBoxMatched =
    previousSelection &&
    relevantMatchesOfPrevBox?.length &&
    matchOfPrevBox !== UNMATCHED_MARKER;

  // Check if there is a new selection and decide what type it is
  if (selection && selectionSnapshot.selectionTime !== selectionTime) {
    const partialSelection = { selection, selectionTime, newSelection: true };
    let currentlyMatching = false;
    if (
      previousSelection &&
      !isCurrentBoxMatched &&
      !isPreviousBoxMatched &&
      previousSelection.row !== selection.row
    ) {
      currentlyMatching = true;
    }
    selectionSnapshot = {
      ...partialSelection,
      currentlyMatching,
    };
  } else if (selectionSnapshot.newSelection) {
    // If no new selection, but the old flat is still true, make it false
    selectionSnapshot = { ...selectionSnapshot, newSelection: false };
  }

  // First move the cursor to where the current selction is
  if (selection && selectionSnapshot.newSelection) {
    dispatch(moveCursorMarker(selection));
  }

  if (selection === null) {
    // (0) Nothing to do here. Just re-render.
  } else if (!selectionSnapshot.newSelection) {
    // (1) Nothing to do here as well. Just re-render.
  } else if (isCurrentBoxMatched) {
    // (2) If the new selection is a matched box, then this is an unmatch operation...
    dispatch(unmatchBox(selection));
    dispatch(addSelectionMarker(selection));
  } else if (previousSelection && selectionSnapshot.currentlyMatching) {
    // (3) If this new selection is a matching operation
    const previousNum =
      setsInOrder[previousSelection.row][previousSelection.index];
    const currentNum = setsInOrder[selection.row][selection.index];
    if (numbersAreCoprime(previousNum, currentNum)) {
      dispatch(
        addMatching({
          matching: [previousSelection, selection],
          setASize: setA.length,
          setBSize: setB.length,
        })
      );
    } else {
      dispatch(addErrorMarksFromObjects([previousSelection, selection]));
      setTimeout(() => dispatch(addSelectionMarker(selection)), 1000);
    }
  } else {
    // (4) Just a new selection. No matching/unmatching.
    dispatch(addSelectionMarker(selection));
  }

  let textToDisplay = [];

  for (let k = 0; k < arrayOfMatches.length; k++) {
    const num1 = setA[arrayOfMatches[k][0]];
    const num2 = setB[arrayOfMatches[k][1]];
    textToDisplay.push(
      <span>
        {`${num1} --- ${num2}`}
        <br />
      </span>
    );
  }
  if (arrayOfMatches.length === min([setASize, setBSize])) {
    textToDisplay.push(<h2>Done!</h2>);
  }

  return (
    <div className="Status-board">
      <div className="inner-status-board">{textToDisplay}</div>
    </div>
  );
};

export default StatusBoard;
