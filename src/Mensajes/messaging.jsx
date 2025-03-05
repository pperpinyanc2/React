import { useEffect, useState } from "react";
import { getUsers, sendMessage, getMessages, deleteMessage, uploadImageToServer } from "../services/api";  
import { auth, signOut } from "../services/firebase";
import Login2 from "./login2";

function Messaging() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [replyToMessage, setReplyToMessage] = useState(null);  
  const [file, setFile] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        getUsers().then(setUsers);
        getMessages().then(setMessages);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (message && currentUser) {
      const sender = currentUser.email;

      const recipientEmails = replyToMessage ? [replyToMessage.sender] : selectedUsers.map(userId => {
        const selectedUser = users.find(user => user.id === userId);
        return selectedUser ? selectedUser.email : null;
      }).filter(email => email !== null);

      await sendMessage(recipientEmails, message, sender);
      setMessage(""); 
      setReplyToMessage(null);  
      setMessages(await getMessages()); 
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setUsers([]);
    setMessages([]);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    getUsers().then(setUsers);
    getMessages().then(setMessages);
  };

  const handleDeleteMessages = async () => {
    const messagesToDelete = messages.filter(msg =>
      msg.recipients.includes(currentUser.email) && msg.sender !== currentUser.email
    );

    if (messagesToDelete.length === 0) {
      alert("NO HAY MENSAJES");
      return;
    }

    for (const msg of messagesToDelete) {
      if (msg.id) {
        await deleteMessage(msg.id);
      }
    }
    setMessages(await getMessages());
  };

  const handleReply = (message) => {
    if (replyToMessage && replyToMessage.id === message.id) {
      setReplyToMessage(null);
      setMessage("");  
    } else {
      setMessage("");  
      setReplyToMessage(message);  
    }
  };

  const handleDeleteMessage = async (messageId) => {
    await deleteMessage(messageId);
    setMessages(await getMessages()); 
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Set the selected file
  };

  const handleImageUpload = async () => {
    if (file && currentUser) {
      try {
        const imageUrl = await uploadImageToServer(file, currentUser.uid); // Assuming you have a function to upload the image to your server
        setMessage(message + ` [Image: ${imageUrl}]`); // Optional: append image URL to the message
      } catch (error) {
        console.error("Error uploading image", error);
      }
    } else {
      alert("Por favor selecciona una imagen antes de intentar subirla.");
    }
  };

  return (
    <div>
      <h1>Whatsapp2</h1>
      {currentUser ? (
        <>
          <p>Hola, {currentUser.email}  <button onClick={handleLogout}>Cerrar sesión</button> </p>
        
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tu mensaje aqui"
          />
          
          {/* Image upload section */}
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleImageUpload}>Subir imagen</button>

          <div>
            {users.map((user) => (
              <label key={user.id}>
                <input
                  type="checkbox"
                  value={user.id}
                  onChange={(e) => {
                    setSelectedUsers(
                      e.target.checked
                        ? [...selectedUsers, user.id]
                        : selectedUsers.filter((id) => id !== user.id)
                    );
                  }}
                />
                {user.email}
              </label>
            ))}
          </div>
          <button onClick={handleSend}>Enviar</button>

          <h2>Recibidos</h2>
          <ul>
            {messages
              .filter((msg) => msg.recipients.includes(currentUser.email) && msg.sender !== currentUser.email)
              .map((msg, index) => (
                <li key={index} style={{ color: replyToMessage && replyToMessage.id === msg.id ? "black" : "red" }}>
                  {msg.text} (de {msg.sender})
                  <button onClick={() => handleReply(msg)}>Responder</button>
                  <button onClick={() => handleDeleteMessage(msg.id)} style={{ marginLeft: "10px" }}>Eliminar</button>
                </li>
            ))}
          </ul>

          {replyToMessage && (
            <div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe tu respuesta"
              />
              <button onClick={handleSend}>Enviar Respuesta</button>
            </div>
          )}

          <button onClick={handleDeleteMessages} style={{ marginTop: "20px" }}>
            Borrar todos los mensajes
          </button>
        </>
      ) : (
        <>
          <p>Inicia sesión para enviar y recibir mensajes</p>
          <Login2 onLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default Messaging;
