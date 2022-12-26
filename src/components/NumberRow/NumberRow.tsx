import NumberBox from "../NumberBox/NumberBox";
import "./NumberRow.css";
import { RootState } from "../../logic/store";
import { useSelector } from "react-redux";

enum RowNum {
  setA = 0,
  setB = 1,
}

export interface NumberRowArgs {
  row: RowNum;
}

const NumberRow = ({ row }: NumberRowArgs) => {
  const { setA, setB } = useSelector((state: RootState) => state.sets);
  const numbers = row === RowNum.setA ? setA : setB;
  const startIndex = row === RowNum.setA ? 0 : setA.length;
  const numberBoxes = numbers.map((num, _index) => (
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
