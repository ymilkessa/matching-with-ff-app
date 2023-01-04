import { useDispatch, useSelector } from "react-redux";
import Button from "../Buttons/Button";
import { generateSets } from "../../logic/stateUpdaters/arraySlice";
import { RootState } from "../../logic/store";
import {
  GameSize,
  changeNumberOfPairs,
} from "../../logic/stateUpdaters/gameSizeSlice";
import "./Controls.css";
import {
  clearAllMatchings,
  unmatchBoxes,
} from "../../logic/stateUpdaters/matchingsSlice";
import { range } from "lodash";
import { BoxLocation } from "../NumberBox/types";

export enum SET_CHANGE_MARKERS {
  IncreaseMarker = "+",
  DecreaseMarker = "-",
}

export enum CONTROLS_TEST_IDS {
  IncreaseRatio = "inc-ratio",
  DecreaseRatio = "dec-ratio",
  IncreaseSetSize = "inc-set-size",
  DecreaseSetSize = "dec-set-size",
}

const changeOverallSize = (
  updateType: SET_CHANGE_MARKERS,
  currentSettings: GameSize
): GameSize | undefined => {
  const newSettings = { ...currentSettings };
  if (updateType === SET_CHANGE_MARKERS.IncreaseMarker) {
    // Updating setASize first to avoid error from delayed changes
    newSettings.setASize = newSettings.setBSize + 1;
    newSettings.setBSize += 1;
  } else if (updateType === SET_CHANGE_MARKERS.DecreaseMarker) {
    if (currentSettings.setBSize > 2) {
      newSettings.setASize = newSettings.setBSize - 1;
      newSettings.setBSize -= 1;
    }
  }
  // Make the dispatch only if a change in settings is possible
  if (newSettings.setASize !== currentSettings.setASize) {
    return newSettings;
  }
};

const Controls = () => {
  const dispatch = useDispatch();
  let gameSettings = useSelector((state: RootState) => state.gameSettings);

  const startNewGame = (settings: GameSize) => {
    dispatch(clearAllMatchings(undefined));
    dispatch(generateSets(settings));
  };
  const changeSizeOfSetA = (
    updateType: SET_CHANGE_MARKERS,
    currentSettings: GameSize
  ): GameSize | undefined => {
    const newSettings = { ...currentSettings };
    if (updateType === SET_CHANGE_MARKERS.IncreaseMarker) {
      if (currentSettings.setASize < currentSettings.setBSize) {
        newSettings.setASize += 1;
      }
    } else if (updateType === SET_CHANGE_MARKERS.DecreaseMarker) {
      if (currentSettings.setASize > 1) {
        newSettings.setASize -= 1;
      }
    }
    // Make the dispatch only if a change in settings is possible
    if (newSettings.setASize !== currentSettings.setASize) {
      return newSettings;
    }
  };

  const updateNumberOfPairs = (updateType: SET_CHANGE_MARKERS) => {
    const newSettings = changeSizeOfSetA(updateType, gameSettings);
    if (newSettings) {
      // First unmatch items beyond the new index to avoid errors
      const removedBoxes = range(
        newSettings.setASize,
        gameSettings.setASize
      ).map((index) => {
        return { row: 0, index } as BoxLocation;
      });
      dispatch(unmatchBoxes(removedBoxes));
      dispatch(changeNumberOfPairs(newSettings));
    }
  };

  const updateOverallSetSize = (updateType: SET_CHANGE_MARKERS) => {
    const newSettings = changeOverallSize(updateType, gameSettings);
    if (newSettings) {
      dispatch(changeNumberOfPairs(newSettings));
      // Now create new set of numbers
      startNewGame(newSettings);
    }
  };

  return (
    <div className="Control-box">
      <div className="left-button">
        <div>
          <Button
            text="New Game"
            action={() => startNewGame(gameSettings)}
            classNames={["reddish-blue"]}
          />
        </div>
      </div>

      <div className="right-side-buttons">
        <div className="right-side-button-class">
          <div>
            Ratio: {gameSettings.setASize}/{gameSettings.setBSize}
          </div>
          <div>
            <Button
              text={SET_CHANGE_MARKERS.IncreaseMarker}
              action={() =>
                updateNumberOfPairs(SET_CHANGE_MARKERS.IncreaseMarker)
              }
              classNames={["default"]}
              otherAttributes={{
                "data-testid": CONTROLS_TEST_IDS.IncreaseRatio,
              }}
            />
          </div>
          <div>
            <Button
              text={SET_CHANGE_MARKERS.DecreaseMarker}
              action={() =>
                updateNumberOfPairs(SET_CHANGE_MARKERS.DecreaseMarker)
              }
              classNames={["default"]}
              otherAttributes={{
                "data-testid": CONTROLS_TEST_IDS.DecreaseRatio,
              }}
            />
          </div>
        </div>
        <div className="right-side-button-class">
          <div>Total: {gameSettings.setBSize}</div>
          <div>
            <Button
              text={SET_CHANGE_MARKERS.IncreaseMarker}
              action={() =>
                updateOverallSetSize(SET_CHANGE_MARKERS.IncreaseMarker)
              }
              classNames={["reddish-blue"]}
              otherAttributes={{
                "data-testid": CONTROLS_TEST_IDS.IncreaseSetSize,
              }}
            />
          </div>
          <div>
            <Button
              text={SET_CHANGE_MARKERS.DecreaseMarker}
              action={() =>
                updateOverallSetSize(SET_CHANGE_MARKERS.DecreaseMarker)
              }
              classNames={["reddish-blue"]}
              otherAttributes={{
                "data-testid": CONTROLS_TEST_IDS.DecreaseSetSize,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
