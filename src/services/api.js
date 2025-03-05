import { db, doc, setDoc } from "./firebase";  
import { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, getDocs, addDoc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; 


export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, "users", user.uid), {
            email: user.email,
        });

        return user;
    } catch (err) {
        console.error("Error al registrar usuario:", err);
        return { error: err.message };
    }
};

export const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return user;
    } catch (err) {
        console.error("Error al iniciar sesión:", err.message);
        return { error: err.message };
    }
};

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(result => {
        return result.user;
    });
};

export const getItems = async () => {
    try {
        const booksCollection = collection(db, "libros"); 
        const snapshot = await getDocs(booksCollection);
        const booksList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
        return booksList;
    } catch (err) {
        console.error("Error al obtener los libros:", err);
        return { error: err.message };
    }
};

export const createItem = async (newBook) => {
    try {
        const booksCollection = collection(db, "libros"); 
        const docRef = await addDoc(booksCollection, newBook); 
        return { id: docRef.id, ...newBook }; 
    } catch (err) {
        console.error("Error al agregar el libro:", err);
        return { error: err.message };
    }
};

export const updateItem = async (id, updatedBook) => {
    try {
        const bookRef = doc(db, "libros", id); 
        await updateDoc(bookRef, updatedBook); 
        return { id, ...updatedBook };
    } catch (err) {
        console.error("Error al actualizar el libro:", err);
        return { error: err.message };
    }
};

export const getItemById = async (id) => {
    try {
        const bookRef = doc(db, "libros", id); 
        const docSnap = await getDoc(bookRef); 
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.error("Libro no encontrado!");
            return null;
        }
    } catch (err) {
        console.error("Error al obtener el libro por id:", err);
        return { error: err.message };
    }
};

export const deleteItem = async (id) => {
    try {
        const bookRef = doc(db, "libros", id);
        await deleteDoc(bookRef);
        return { id };
    } catch (err) {
        console.error("Error al eliminar el libro:", err);
        return { error: err.message };
    }
};
//WHATSAPP2

export const getUsers = async () => {
    try {
        const usersCollection = collection(db, "users");
        const snapshot = await getDocs(usersCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
        console.error("Error al obtener los usuarios:", err);
        return { error: err.message };
    }
};

export const sendMessage = async (recipients, text, sender) => {
try {
    const messagesCollection = collection(db, "messages");
    await addDoc(messagesCollection, {
    recipients, //ESTE ES A QUIEN SE LO ENVIAS
    text,
    sender,    
    });
} catch (err) {
    console.error("Error al enviar el mensaje:", err);
    return { error: err.message };
}
};


export const getMessages = async () => {
try {
    const messagesCollection = collection(db, "messages");
    const snapshot = await getDocs(messagesCollection);
    return snapshot.docs.map(doc => ({
    id: doc.id,  
    ...doc.data() 
    }));
} catch (err) {
    console.error("Error al obtener los mensajes:", err);
    return { error: err.message };
}
};


export const deleteMessage = async (id) => {
try {
    const messageRef = doc(db, "messages", id);
    await deleteDoc(messageRef);
    console.log("Mensaje eliminado correctamente");
    return { id };
} catch (err) {
    console.error("Error al eliminar el mensaje:", err);
    return { error: err.message };
}
};

export const uploadImage = async (file, uid) => {
  const storageRef = ref(getStorage, `/files/${uid}/${file.name}`);
  const uploadTask = uploadBytes(storageRef, file);
  uploadTask.then(async (data) => {
    const url = await getDownloadURL(data.ref);
    const colRef = collection(db, "users");
    await setDoc(doc(colRef, uid), { uploadedPicture: url });
  });
};