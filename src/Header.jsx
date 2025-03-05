import { Link } from "react-router-dom";

function Header() {
  return (
    <nav style={{ 
      display: "flex", 
      gap: "20px", 
      padding: "10px",  
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      zIndex: 1000 
    }}>
      <Link to="/">Lista de Tareas</Link>
      <Link to="/create">Crear</Link>
      <Link to="/read">Leer</Link>
      <Link to="/update/1">Editar</Link>
      <Link to="/updateDef">UpdateDef</Link> 
      <Link to="/messaging">Mensajería</Link> 
    </nav>
  );
}

export default Header;
