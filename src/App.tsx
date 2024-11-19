import { useState, useCallback, useMemo, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import EmptyState from "./components/EmptyState";
import { Todo } from "./models/interfaces";
import { fetchItems } from "./services/api";
import { TODOS_PER_PAGE } from "./config/constants";
import "./styles/index.css";

/**
 * Main Application Component
 * Manages state and integrates functionality for todo management.
 */
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State to manage todo list
  const [page, setPage] = useState(1); // State to track the current page for pagination

  // Fetch initial data from APIs when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItems();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    fetchData();
  }, []);

  /**
   * Add a new todo item to the list.
   * @param title - The title of the todo.
   * @param description - The description of the todo.
   */
  const addTodo = useCallback((title: string, description: string) => {
    setTodos((prev) => [{ id: Date.now(), title, description }, ...prev]);
  }, []);

  /**
   * Delete a todo item from the list by its ID.
   * @param id - The ID of the todo to delete.
   */
  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  /**
   * Edit an existing todo item by its ID.
   * @param id - The ID of the todo to edit.
   * @param updatedTodo - Partial updates to apply to the todo.
   */
  const editTodo = useCallback((id: number, updatedTodo: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  }, []);

  /**
   * Load more todos for pagination by incrementing the current page.
   */
  const loadMoreTodos = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  // Calculate the todos to display based on the current page
  const displayedTodos = useMemo(
    () => todos.slice(0, page * TODOS_PER_PAGE),
    [todos, page]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Sidebar for adding todos */}
      <div className="sidebar p-4 flex items-center justify-center">
        <AddTodoForm addTodo={addTodo} />
      </div>
      {/* Main content area for displaying todos */}
      <div className="content-area p-4">
        {displayedTodos.length > 0 ? (
          <TodoList
            todos={displayedTodos}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            loadMore={loadMoreTodos}
            hasMore={displayedTodos.length < todos.length}
          />
        ) : (
          <EmptyState /> // Display empty state when no todos exist
        )}
      </div>
    </div>
  );
};

export default App;
