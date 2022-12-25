import "./NumberBox.css";

export interface NumberBoxArgs {
  num: number;
  row: number;
  index: number;
}

const NumberBox = ({ num, row, index }: NumberBoxArgs) => {
  const onClickFunc = () => {
    console.log(
      `This is number ${num}. It has index ${index} and is on row ${row}`
    );
  };
  return (
    <div
      className="col-xs-1 Number-box number-box-neutral"
      onClick={onClickFunc}
    >
      {num}
    </div>
  );
};

export default NumberBox;
