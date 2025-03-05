import { useEffect, useState } from "react";
import { getItems, createItem, updateItem, deleteItem } from "../services/api";

const UpdateDef = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", price: "" });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const data = await getItems();
    setBooks(data);
  };

  const handleAdd = async () => {
    if (newBook.title && newBook.price) {
      await createItem(newBook);
      setNewBook({ title: "", price: "" });
      fetchBooks();
    }
  };

  const handleUpdate = async (id, updatedBook) => {
    await updateItem(id, updatedBook);
    fetchBooks();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h2>BASE DE DATOS DE LIBROS</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Price</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>
                <input
                  type="text"
                  value={book.title || ""} 
                  onChange={(e) =>
                    setBooks(
                      books.map((b) =>
                        b.id === book.id ? { ...b, title: e.target.value } : b
                      )
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={book.price || ""} 
                  onChange={(e) =>
                    setBooks(
                      books.map((b) =>
                        b.id === book.id ? { ...b, price: e.target.value } : b
                      )
                    )
                  }
                />
              </td>
              <td>
                <button onClick={() => handleDelete(book.id)}>Remove</button>
                <button onClick={() => handleUpdate(book.id, book)}>Update</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>New</td>
            <td>
              <input
                type="text"
                value={newBook.title}
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              />
            </td>
            <td>
              <input
                type="text"
                value={newBook.price}
                onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
              />
            </td>
            <td>
              <button onClick={handleAdd}>Add</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UpdateDef;
