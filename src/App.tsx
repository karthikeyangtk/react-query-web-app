import JsonList from "modules/post/postList";
import "App.css";

const App = () => {
  return (
    <div className="App" data-testid={"main-app"}>
      <JsonList />
    </div>
  );
};

export default App;
