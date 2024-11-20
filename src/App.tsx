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
 * Handles state, sorting, pagination, and integration with the mock API.
 */
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State to manage the list of todos
  const [page, setPage] = useState(1); // State to track pagination
  const [sortCriteria, setSortCriteria] = useState<string>(""); // State to manage sorting criteria

  /**
   * Fetch initial data from the mock API when the component mounts
   */
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
   * Add a new todo to the list
   * @param title - The title of the todo
   * @param description - The description of the todo
   */
  const addTodo = useCallback((title: string, description: string) => {
    setTodos((prev) => [{ id: Date.now(), title, description }, ...prev]);
  }, []);

  /**
   * Delete a todo from the list by its ID
   * @param id - The ID of the todo to delete
   */
  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  /**
   * Edit an existing todo in the list
   * @param id - The ID of the todo to edit
   * @param updatedTodo - The updated properties of the todo
   */
  const editTodo = useCallback((id: number, updatedTodo: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  }, []);

  /**
   * Load more todos for pagination
   */
  const loadMoreTodos = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  /**
   * Handle sorting of the todos based on selected criteria
   */
  const sortedTodos = useMemo(() => {
    if (!sortCriteria) return todos;

    return [...todos].sort((a, b) => {
      const key = sortCriteria.includes("title") ? "title" : "description";
      const order = sortCriteria.includes("asc") ? 1 : -1;
      return a[key].localeCompare(b[key]) * order;
    });
  }, [todos, sortCriteria]);

  /**
   * Calculate the todos to display based on pagination and sorting
   */
  const displayedTodos = useMemo(
    () => sortedTodos.slice(0, page * TODOS_PER_PAGE),
    [sortedTodos, page]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Sidebar for adding new todos */}
      <div className="sidebar p-4 flex items-center justify-center">
        <AddTodoForm addTodo={addTodo} />
      </div>

      {/* Main content area for displaying todos */}
      <div className="content-area p-4">
        {/* Sorting dropdown */}
        <div className="flex justify-end pb-4">
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Sort By</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="description-asc">Description (A-Z)</option>
            <option value="description-desc">Description (Z-A)</option>
          </select>
        </div>

        {/* Display todos or empty state */}
        {displayedTodos.length > 0 ? (
          <TodoList
            todos={displayedTodos}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            loadMore={loadMoreTodos}
            hasMore={displayedTodos.length < todos.length}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default App;
