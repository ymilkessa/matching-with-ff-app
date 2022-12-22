import { MouseEventHandler } from "react";

interface ButtonArgs {
  text: string;
  action: Object;
  classNames: string[];
}

const Button = ({ text, action, classNames }: ButtonArgs) => {
  const classNamesList = ["button", ...classNames];
  let classNamesString = "";
  for (let k = 0; k < classNamesList.length; k++) {
    classNamesString += `${classNamesList[k]} `;
  }
  return (
    <div
      className={classNamesString}
      onClick={action as MouseEventHandler<HTMLDivElement>}
    >
      {text}
    </div>
  );
};

export default Button;
