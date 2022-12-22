import NumberBox from "../NumberBox/NumberBox";
import "./NumberRow.css";

export interface NumberRowArgs {
  numbers: number[];
}

const NumberRow = ({ numbers }: NumberRowArgs) => {
  const numberBoxes = numbers.map((num) => <NumberBox num={num} />);
  return <div className="row Number-row">{numberBoxes}</div>;
};

export default NumberRow;
