import "./App.css";
import { Game } from "./Game";
import githubImgUrl from "./assets/github-mark.png";

function App() {
  return (
    <>
      <div className="links">
        <a href="https://github.com/pabo/20numbers">
          <img src={githubImgUrl} height="30px" />
        </a>
      </div>
      <Game />
    </>
  );
}

export default App;
