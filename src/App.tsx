import "./App.css";
import Button from "./components/Button";
import GameContainer from "./components/GameContainer/GameContainer";
import NumberRow from "./components/NumberRow/NumberRow";

function App() {
  const buttonProperties = {
    text: "Some test button",
    classNames: ["test-button"],
    action: () => {
      console.log("Test Button pressed!");
    },
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button {...buttonProperties} />
      </header>
      <GameContainer />
    </div>
  );
}

export default App;
