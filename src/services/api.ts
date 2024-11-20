import axios from "axios";
import { Todo } from "../models/interfaces";

// Base URLs
const TODOS_API_URL = "https://jsonplaceholder.typicode.com/todos";
const QUOTES_API_URL = "https://api.quotable.io/quotes?limit=20";

/**
 * Fetch todos from the JSONPlaceholder API and pair them with quotes.
 */
export const fetchItems = async (): Promise<Todo[]> => {
  try {
    const [todosResponse, quotesResponse] = await Promise.all([
      axios.get(`${TODOS_API_URL}?_limit=20`),
      axios.get(QUOTES_API_URL),
    ]);

    const todos = todosResponse.data;
    const quotes = quotesResponse.data.results;

    // Pair todos with quotes
    return todos.map((todo: any, index: number) => ({
      id: todo.id,
      title: todo.title || "Untitled Task",
      description:
        quotes[index % quotes.length]?.content || "No description available",
    }));
  } catch (error) {
    console.error("Error fetching todos or quotes:", error);
    throw error;
  }
};

/**
 * Add a new todo.
 */
export const addItem = async (newTodo: Partial<Todo>): Promise<Todo> => {
  try {
    const response = await axios.post(TODOS_API_URL, newTodo);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

/**
 * Update an existing todo.
 */
export const updateItem = async (
  id: number,
  updatedTodo: Partial<Todo>
): Promise<Todo> => {
  try {
    const response = await axios.put(`${TODOS_API_URL}/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

/**
 * Delete a todo.
 */
export const deleteItem = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${TODOS_API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
