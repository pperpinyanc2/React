import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateItem,deleteItem, getItemById } from "../services/api";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [titulo, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      const book = await getItemById(id);
      if (book) {
        setTitle(book.titulo);
        setAuthor(book.author);
        setDate(book.date);
      }
    };
    fetchBook();
  }, [id]);

  const handleUpdate = async () => {
    await updateItem(id, { titulo, author, date });
    navigate("/read");
  };

  const handleDelete = async () => {
    await deleteItem(id);
    navigate("/read");
  };

  return (
    <div>
      <div style={{ paddingTop: "50px", paddingLeft: "10px", textAlign: "left" }}></div>
      <h3>Modificar o Borrar</h3>
      <input value={titulo} onChange={(e) => setTitle(e.target.value)} />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Update;
