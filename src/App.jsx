import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<Contacts />}></Route>
        <Route path="/add-contact" element={<AddContact />}></Route>
        {/* <Route path="/edit-contact" element={<EditContact />}></Route> */}
        <Route path="/edit-contact/:id" element={<EditContact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
