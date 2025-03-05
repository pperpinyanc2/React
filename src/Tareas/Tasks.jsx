import { db, collection, addDoc, getDocs, query, deleteDoc, doc, updateDoc } from "../services/firebase";
import { useState, useEffect } from "react";
import { useUserContext } from "../providers/UserProvider";

const Tasks = () => {
    const { user } = useUserContext();
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskDuration, setTaskDuration] = useState("");
    const [taskPriority, setTaskPriority] = useState("baja");
    const [showModal, setShowModal] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [newTaskName, setNewTaskName] = useState("");

    useEffect(() => {
        if (user?.id) {
            fetchTasks();
        }
    }, [user]);

    const fetchTasks = async () => {
        if (!user?.id) return;
        const userTasks = await getTasksByUserId(user.id);
        setTasks(userTasks);
    };

    const handleAddTask = async () => {
        if (!taskName.trim() || !taskDuration.trim()) return;

        let backgroundColor = "";
        switch (taskPriority) {
            case "alta":
                backgroundColor = "#FFCCCC";
                break;
            case "media":
                backgroundColor = "#FFD580";
                break;
            case "baja":
                backgroundColor = "#FFFF99";
                break;
            default:
                backgroundColor = "#FFFF99";
        }

        await addTaskForUser(user.id, { 
            name: taskName, 
            duration: taskDuration,
            backgroundColor: backgroundColor,
            priority: taskPriority,  
        });

        setTaskName("");
        setTaskDuration("");
        setTaskPriority("baja");
        setShowModal(false);
        fetchTasks();
    };

    const handleDeleteTask = async (taskId) => {
        await deleteTaskForUser(user.id, taskId);
        fetchTasks();
    };

    const handleEditTask = (taskId, currentName) => {
        setEditingTaskId(taskId);
        setNewTaskName(currentName);
    };

    const handleUpdateTask = async () => {
        if (!newTaskName.trim()) return;

        await updateTaskName(user.id, editingTaskId, newTaskName);

        setEditingTaskId(null);
        setNewTaskName("");
        fetchTasks();
    };

    const highPriorityTasks = tasks.filter(task => task.priority === "alta");
    const mediumPriorityTasks = tasks.filter(task => task.priority === "media");
    const lowPriorityTasks = tasks.filter(task => task.priority === "baja");

    return (
        <div>
            <h2>Tus Tareas</h2>
            <button onClick={() => setShowModal(true)}>Añadir tarea</button>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h3>Agregar nueva tarea</h3>
                        <input 
                            type="text" 
                            placeholder="Nombre de la tarea..." 
                            value={taskName} 
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="Duración..." 
                            value={taskDuration} 
                            onChange={(e) => setTaskDuration(e.target.value)}
                        />
                        <select 
                            value={taskPriority} 
                            onChange={(e) => setTaskPriority(e.target.value)}
                        >
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                        <button onClick={handleAddTask}>Añadir</button>
                        <button onClick={() => setShowModal(false)}>Cancelar</button>
                    </div>
                </div>
            )}

            {highPriorityTasks.length > 0 && (
                <div>
                    <h3>Prioridad Alta</h3>
                    <ul>
                        {highPriorityTasks.map(task => (
                            <li key={task.id} style={{ backgroundColor: task.backgroundColor, padding: '10px', marginBottom: '8px', borderRadius: '5px' }}>
                                {editingTaskId === task.id ? (
                                    <div>
                                        <input 
                                            type="text" 
                                            value={newTaskName} 
                                            onChange={(e) => setNewTaskName(e.target.value)} 
                                        />
                                        <button onClick={handleUpdateTask}>Guardar</button>
                                    </div>
                                ) : (
                                    <span style={{ fontWeight: 'bold' }}>{task.name}</span>
                                )}
                                (Duración: {task.duration})
                                <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                                <button onClick={() => handleEditTask(task.id, task.name)} style={{ marginLeft: '10px' }}>Actualizar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {mediumPriorityTasks.length > 0 && (
                <div>
                    <h3>Prioridad Media</h3>
                    <ul>
                        {mediumPriorityTasks.map(task => (
                            <li key={task.id} style={{ backgroundColor: task.backgroundColor, padding: '10px', marginBottom: '8px', borderRadius: '5px' }}>
                                {editingTaskId === task.id ? (
                                    <div>
                                        <input 
                                            type="text" 
                                            value={newTaskName} 
                                            onChange={(e) => setNewTaskName(e.target.value)} 
                                        />
                                        <button onClick={handleUpdateTask}>Actualizar</button>
                                    </div>
                                ) : (
                                    <span style={{ fontWeight: 'bold' }}>{task.name}</span>
                                )}
                                (Duración: {task.duration})
                                <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                                <button onClick={() => handleEditTask(task.id, task.name)} style={{ marginLeft: '10px' }}>Actualizar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {lowPriorityTasks.length > 0 && (
                <div>
                    <h3>Prioridad Baja</h3>
                    <ul>
                        {lowPriorityTasks.map(task => (
                            <li key={task.id} style={{ backgroundColor: task.backgroundColor, padding: '10px', marginBottom: '8px', borderRadius: '5px' }}>
                                {editingTaskId === task.id ? (
                                    <div>
                                        <input 
                                            type="text" 
                                            value={newTaskName} 
                                            onChange={(e) => setNewTaskName(e.target.value)} 
                                        />
                                        <button onClick={handleUpdateTask}>Actualizar</button>
                                    </div>
                                ) : (
                                    <span style={{ fontWeight: 'bold' }}>{task.name}</span>
                                )}
                                (Duración: {task.duration})
                                <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                                <button onClick={() => handleEditTask(task.id, task.name)} style={{ marginLeft: '10px' }}>Actualizar</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Tasks;

export const getTasksByUserId = async (userId) => {
    const q = query(collection(db, `users/${userId}/tasks`)); 
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addTaskForUser = async (userId, task) => {  
    try {  
        await addDoc(collection(db, `users/${userId}/tasks`), task);  
        console.log("Tarea agregada correctamente");  
    } catch (error) {  
        console.error("Error al agregar la tarea:", error);  
    }  
};

export const deleteTaskForUser = async (userId, taskId) => {
    try {
        await deleteDoc(doc(db, `users/${userId}/tasks`, taskId)); 
        console.log("Tarea eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la tarea:", error);
    }
};

export const updateTaskName = async (userId, taskId, newName) => {
    try {
        const taskRef = doc(db, `users/${userId}/tasks`, taskId);
        await updateDoc(taskRef, { name: newName });
        console.log("Tarea actualizada correctamente");
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
    }
};
