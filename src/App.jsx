import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<Contacts />}></Route>
        <Route path="/add-contact" element={<AddContact />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
