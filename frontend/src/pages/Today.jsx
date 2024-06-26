import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material/";

import Sidebar from "../components/Sidebar";
import Task from "../components/Task";
import AddTodo from "../components/AddTodo";
const backendUrl = import.meta.env.VITE_API_URL;

function Today() {
  const [updateCounter, setUpdateCounter] = useState(0);
  const [todos, setTodos] = useState([]);
  const [addState, setAddState] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUpdateCounter((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const response = await axios.put(`${backendUrl}/todos/${id}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.message);
      setUpdateCounter((c) => c + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTodoState = () => {
    setAddState(true);
  };

  const handleTodoAdded = () => {
    setAddState(false);
    setUpdateCounter((prevCounter) => prevCounter + 1);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${backendUrl}/todos/today`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTodos(response.data.todos);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, [updateCounter]);

  return (
    <Grid container spacing={10}>
      <Grid item sm={3} md={4} lg={3} display={{ xs: "none", sm: "block" }}>
        <Sidebar style={{ display: { xs: "none" } }} active={1} />
      </Grid>
      <Grid item xs={12} sm={9} md={8} lg={9}>
        {todos.map((todo) => (
          <Task
            key={todo._id}
            task={todo}
            handleComplete={handleComplete}
            handleDelete={handleDelete}
          />
        ))}
        <AddTodo
          handleAddTodoState={handleAddTodoState}
          addState={addState}
          setAddState={setAddState}
          handleTodoAdded={handleTodoAdded}
        />
      </Grid>
    </Grid>
  );
}

export default Today;
