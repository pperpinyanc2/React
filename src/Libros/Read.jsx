import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItems } from "../services/api";
const Read = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getItems();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <div style={{ paddingTop: "50px", paddingLeft: "10px", textAlign: "left" }}></div>
      <h3>Lista de libros</h3>
      <table border="1">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>author</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td><Link to={`/update/${book.id}`}>{book.id}</Link></td>
              <td>{book.titulo}</td>
              <td>{book.author}</td>
              <td>{book.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Read;
