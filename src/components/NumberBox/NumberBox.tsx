import "./NumberBox.css";

export interface NumberBoxArgs {
  num: number;
}

const NumberBox = ({ num }: NumberBoxArgs) => {
  return <div className="col-xs-1 Number-box">{num}</div>;
};

export default NumberBox;
