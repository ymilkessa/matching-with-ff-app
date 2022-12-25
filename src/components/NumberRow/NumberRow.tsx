import NumberBox from "../NumberBox/NumberBox";
import "./NumberRow.css";

export interface NumberRowArgs {
  numbers: number[];
  startIndex: number;
  row: number;
}

const NumberRow = ({ numbers, startIndex, row }: NumberRowArgs) => {
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
