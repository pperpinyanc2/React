import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Tareas/Home";
import Create from "./Libros/Create";
import Read from "./Libros/Read";
import Update from "./Libros/Update";
import Header from "./Header";
import UpdateDef from "./Libros/UpdateDef";
import Messaging from "./Mensajes/messaging";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/read" element={<Read />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/updateDef" element={<UpdateDef />} />
        <Route path="/messaging" element={<Messaging />} /> 
      </Routes>
    </Router>
  );
}

export default App;