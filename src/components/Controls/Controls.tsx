import { useDispatch, useSelector } from "react-redux";
import Button from "../Buttons/Button";
import { generateSets } from "../../logic/gameLogic/arraySlice";
import { RootState } from "../../logic/store";
import {
  GameSize,
  changeNumberOfPairs,
} from "../../logic/gameSettings/sizeSlice";

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

const Controls = () => {
  const dispatch = useDispatch();
  let gameSettings = useSelector((state: RootState) => state.gameSettings);

  const updateNumberOfPairs = (updateType: setChangeMarkers) => {
    const newSettings = changeSizeOfSetA(updateType, gameSettings);
    if (newSettings) {
      return dispatch(changeNumberOfPairs(newSettings));
    }
  };

  return (
    <div className="Control-box row">
      <Button
        text="New Game"
        action={() => dispatch(generateSets(gameSettings))}
        classNames={["col-sm-2"]}
      />
      <div>
        <div>Number Ratio</div>
        <Button
          text={setChangeMarkers.IncreaseMarker}
          action={() => updateNumberOfPairs(setChangeMarkers.IncreaseMarker)}
          classNames={["col-sm-2"]}
        />
        <Button
          text={setChangeMarkers.DecreaseMarker}
          action={() => updateNumberOfPairs(setChangeMarkers.DecreaseMarker)}
          classNames={["col-sm-2"]}
        />
      </div>
    </div>
  );
};

export default Controls;
