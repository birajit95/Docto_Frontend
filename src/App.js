import Application from "./Common/components/Application";
import GlobalContext from "./Common/components/GlobalContext";
import "./css/style.css"

function App() {
  return (
    <>
    <GlobalContext>
        <Application />
    </GlobalContext>
    </>
  );
}

export default App;
