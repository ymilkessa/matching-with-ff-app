import { useDispatch, useSelector } from "react-redux";
import Button from "../Buttons/Button";
import { generateSets } from "../../logic/gameLogic/arraySlice";
import { RootState } from "../../logic/store";
import {
  GameSize,
  changeNumberOfPairs,
} from "../../logic/gameSettings/sizeSlice";
import "./Controls.css";

enum setChangeMarkers {
  IncreaseMarker = "+",
  DecreaseMarker = "-",
}

const changeSizeOfSetA = (
  updateType: setChangeMarkers,
  currentSettings: GameSize
): GameSize | undefined => {
  const newSettings = { ...currentSettings };
  if (updateType === setChangeMarkers.IncreaseMarker) {
    if (currentSettings.setASize < currentSettings.setBSize) {
      newSettings.setASize += 1;
    }
  } else if (updateType === setChangeMarkers.DecreaseMarker) {
    if (currentSettings.setASize > 1) {
      newSettings.setASize -= 1;
    }
  }
  // Make the dispatch only if a change in settings is possible
  if (newSettings.setASize !== currentSettings.setASize) {
    return newSettings;
  }
};

const changeOverallSize = (
  updateType: setChangeMarkers,
  currentSettings: GameSize
): GameSize | undefined => {
  const newSettings = { ...currentSettings };
  if (updateType === setChangeMarkers.IncreaseMarker) {
    // Updating setASize first to avoid error from delayed changes
    newSettings.setASize = newSettings.setBSize + 1;
    newSettings.setBSize += 1;
  } else if (updateType === setChangeMarkers.DecreaseMarker) {
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

  const updateNumberOfPairs = (updateType: setChangeMarkers) => {
    const newSettings = changeSizeOfSetA(updateType, gameSettings);
    if (newSettings) {
      return dispatch(changeNumberOfPairs(newSettings));
    }
  };

  const updateOverallSetSize = (updateType: setChangeMarkers) => {
    const newSettings = changeOverallSize(updateType, gameSettings);
    if (newSettings) {
      dispatch(changeNumberOfPairs(newSettings));
      // Now create new set of numbers
      return dispatch(generateSets(newSettings));
    }
  };

  return (
    <div className="row Control-box">
      <div className="col-sm-3 left-button">
        <div>
          <Button
            text="New Game"
            action={() => dispatch(generateSets(gameSettings))}
            classNames={["reddish-blue"]}
          />
        </div>
      </div>

      <div className="right-side-buttons col-sm-4">
        <div className="right-side-button-class">
          <div>
            Ratio: {gameSettings.setASize}/{gameSettings.setBSize}
          </div>
          <div>
            <Button
              text={setChangeMarkers.IncreaseMarker}
              action={() =>
                updateNumberOfPairs(setChangeMarkers.IncreaseMarker)
              }
              classNames={["default"]}
            />
          </div>
          <div>
            <Button
              text={setChangeMarkers.DecreaseMarker}
              action={() =>
                updateNumberOfPairs(setChangeMarkers.DecreaseMarker)
              }
              classNames={["default"]}
            />
          </div>
        </div>
        <div className="right-side-button-class">
          <div>Total: {gameSettings.setBSize}</div>
          <div>
            <Button
              text={setChangeMarkers.IncreaseMarker}
              action={() =>
                updateOverallSetSize(setChangeMarkers.IncreaseMarker)
              }
              classNames={["reddish-blue"]}
            />
          </div>
          <div>
            <Button
              text={setChangeMarkers.DecreaseMarker}
              action={() =>
                updateOverallSetSize(setChangeMarkers.DecreaseMarker)
              }
              classNames={["reddish-blue"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
