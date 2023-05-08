import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { FormFields } from "./components/FormFields";
import { Form } from "./components/Form";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="md:flex md:items-start mb-6">
        <div className="md:w-1/6">
          <Menu />
        </div>
        <div className="md:w-1/2">
          <FormFields />
        </div>
        <div className="md:w-1/2">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
