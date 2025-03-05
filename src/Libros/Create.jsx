import { useState } from "react";
import { createItem } from "../services/api";

const Create = () => {
  const [titulo, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  const handleCreate = async () => {
    await createItem({ titulo, author, date });
    setTitle("");
    setAuthor("");
    setDate("");
  };

  return (
    <div>
      <div style={{ paddingTop: "50px", paddingLeft: "10px", textAlign: "left" }}></div>
      <h3>Añadir Libro</h3>
      <input value={titulo} onChange={(e) => setTitle(e.target.value)} placeholder="Título" />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Autor" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default Create;
