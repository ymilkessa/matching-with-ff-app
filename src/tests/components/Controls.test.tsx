// describe("Component rendering tests", () => {});
import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Controls, {
  CONTROLS_TEST_IDS,
  SET_CHANGE_MARKERS,
} from "../../components/Controls/Controls";
import { renderWithProviders } from "./test-utils";
import { isEqual, max } from "lodash";

describe("Test controls component", () => {
  it("Component renders properly", () => {
    renderWithProviders(<Controls />);
    const linkElement = screen.getByText("New Game");
    expect(linkElement).toBeInTheDocument();
    const plusButtons = screen.getAllByText(SET_CHANGE_MARKERS.IncreaseMarker);
    expect(plusButtons.length).toBe(2);
    const minusButtons = screen.getAllByText(SET_CHANGE_MARKERS.DecreaseMarker);
    expect(minusButtons.length).toBe(2);
  });

  it("Selecting 'New Game' generates new sets of numbers", () => {
    const { store } = renderWithProviders(<Controls />);
    const oldSets = store.getState().sets;
    const initialSetA = [...oldSets.setA];
    const initialSetB = [...oldSets.setB];
    const newGameButton = screen.getByText("New Game");
    let newGameGenerated: boolean = false;
    let k = 0;
    while (k < 4) {
      k += 1;
      fireEvent.click(newGameButton);
      const newSets = store.getState().sets;
      if (
        !isEqual(initialSetA, newSets.setA) ||
        !isEqual(initialSetB, newSets.setB)
      ) {
        newGameGenerated = true;
        break;
      }
    }
    expect(newGameGenerated).toBe(true);
  });

  it("The set-size buttons correctly change the sizes of the number sets", () => {
    const { store } = renderWithProviders(<Controls />);
    const oldSetSizes = store.getState().gameSettings;

    // Pre-requisite: the set sizes in the store be larger than 2.
    expect(max([oldSetSizes.setASize, oldSetSizes.setBSize])).toBeGreaterThan(
      2
    );

    const incSetSizeButton = screen.getByTestId(
      CONTROLS_TEST_IDS.IncreaseSetSize
    );
    fireEvent.click(incSetSizeButton);
    let newSetSizes = store.getState().gameSettings;
    expect(newSetSizes.setASize).toBe(oldSetSizes.setASize + 1);
    expect(newSetSizes.setBSize).toBe(oldSetSizes.setBSize + 1);
    // Now fire the decrement set size button twice to get below the default.
    const decSetSizeButton = screen.getByTestId(
      CONTROLS_TEST_IDS.DecreaseSetSize
    );
    fireEvent.click(decSetSizeButton);
    fireEvent.click(decSetSizeButton);
    newSetSizes = store.getState().gameSettings;
    expect(newSetSizes.setASize).toBe(oldSetSizes.setASize - 1);
    expect(newSetSizes.setBSize).toBe(oldSetSizes.setBSize - 1);
  });

  it("The set-ratio buttons correctly change setA while keeping setB the same size", () => {
    const { store } = renderWithProviders(<Controls />);
    const oldSetSizes = store.getState().gameSettings;

    // Pre-requisite: the set sizes in the store be larger than 2.
    expect(max([oldSetSizes.setASize, oldSetSizes.setBSize])).toBeGreaterThan(
      2
    );

    const decSetASizeButton = screen.getByTestId(
      CONTROLS_TEST_IDS.DecreaseRatio
    );
    fireEvent.click(decSetASizeButton);
    fireEvent.click(decSetASizeButton);
    let newSetSizes = store.getState().gameSettings;
    expect(newSetSizes.setASize).toBe(oldSetSizes.setASize - 2);
    expect(newSetSizes.setBSize).toBe(oldSetSizes.setBSize);
    // Now fire the decrement set size button twice to get below the default.
    const incSetASizeButton = screen.getByTestId(
      CONTROLS_TEST_IDS.IncreaseRatio
    );
    fireEvent.click(incSetASizeButton);
    newSetSizes = store.getState().gameSettings;
    expect(newSetSizes.setASize).toBe(oldSetSizes.setASize - 1);
    expect(newSetSizes.setBSize).toBe(oldSetSizes.setBSize);
  });
});
