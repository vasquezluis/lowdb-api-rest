import { v4 as uuid } from "uuid";
import { getConnection } from "../database.js";

export const getTask = (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const task = getConnection().data.tasks.find((task) => task.id == id);

    if (!task) return res.sendStatus(404);

    res.json({ message: `Tarea ${id}`, body: task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = (req, res) => {
  try {
    const tasks = getConnection().data.tasks;

    res.json({ message: "Lista de tareas", data: tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const countTasks = (req, res) => {
  try {
    const totalTasks = getConnection().data.tasks.length;

    res.json(totalTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTasks = async (req, res) => {
  const { name, description } = req.body;

  // crear nueva data
  const newTask = {
    id: uuid(),
    name,
    description,
  };

  try {
    // crear conexion
    const db = getConnection();

    // crear archivo en memoria
    db.data.tasks.push(newTask);

    // guardar datos en db.json
    await db.write();

    res.json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTasks = async (req, res) => {
  const {
    params: { id },
  } = req;

  const { name, description } = req.body;

  try {
    const db = getConnection();

    const taskFound = db.data.tasks.find((task) => task.id == id);

    if (!taskFound) return res.sendStatus(404);

    taskFound.name = name;
    taskFound.description = description;

    db.data.tasks.map((task) => (task.id == id ? taskFound : task));

    await db.write();

    res.json(taskFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTasks = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const db = getConnection();

    const taskFound = db.data.tasks.find((task) => task.id == id);

    if (!taskFound) return res.sendStatus(404);

    const newTasks = db.data.tasks.filter((task) => task.id !== id);

    db.data.tasks = newTasks;

    await db.write();

    res.json(taskFound);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
