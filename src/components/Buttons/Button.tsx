import { MouseEventHandler } from "react";
import "./Button.css";

interface ButtonArgs {
  text: string;
  action: MouseEventHandler<HTMLDivElement>;
  classNames: string[];
}

const Button = ({ text, action, classNames }: ButtonArgs) => {
  const classNamesList = ["common-properties", ...classNames];
  let classNamesString = "";
  for (let k = 0; k < classNamesList.length; k++) {
    classNamesString += `${classNamesList[k]} `;
  }
  return (
    <div className={classNamesString} onClick={action}>
      {text}
    </div>
  );
};

export default Button;
