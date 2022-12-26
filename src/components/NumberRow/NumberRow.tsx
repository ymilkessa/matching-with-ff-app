import NumberBox from "../NumberBox/NumberBox";
import "./NumberRow.css";
import { RootState } from "../../logic/store";
import { useSelector } from "react-redux";
import "./NumberRow.css";

enum RowNum {
  setA = 0,
  setB = 1,
}

export interface NumberRowArgs {
  row: RowNum;
}

const NumberRow = ({ row }: NumberRowArgs) => {
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const { setASize, setBSize } = useSelector(
    (state: RootState) => state.gameSettings
  );
  const numbers = row === RowNum.setA ? setA : setB;
  const setSize = row === RowNum.setA ? setASize : setBSize;
  const startIndex = row === RowNum.setA ? 0 : setA.length;
  const numbersToDisplay = numbers.slice(0, setSize);
  const numberBoxes = numbersToDisplay.map((num, _index) => (
    // The 'key' element is simply to satisfy a react requirement
    <NumberBox
      num={num}
      row={row}
      index={startIndex + _index}
      key={startIndex + _index}
    />
  ));
  return <div className="row Number-row">{numberBoxes}</div>;
};

export default NumberRow;
