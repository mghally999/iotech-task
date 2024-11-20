import { useState, useCallback, useMemo, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import EmptyState from "./components/EmptyState";
import { Todo } from "./models/interfaces";
import { fetchItems, addItem, deleteItem } from "./services/api";
import { TODOS_PER_PAGE } from "./config/constants";
import "./styles/index.css";

/**
 * Main Application Component
 */
const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]); // State for todos
  const [page, setPage] = useState(1); // State for pagination
  const [sortCriteria, setSortCriteria] = useState<string>(""); // Sorting criteria
  const [loading, setLoading] = useState(false); // Loading state

  /**
   * Fetch initial todos and quotes
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchItems();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /**
   * Add a new todo
   */
  const addTodo = useCallback(async (title: string, description: string) => {
    try {
      setLoading(true);
      const newTodo = await addItem({
        title,
        description: description || "No description available",
      });
      setTodos((prev) => [newTodo, ...prev]);
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete a todo
   */
  const deleteTodo = useCallback(async (id: number) => {
    try {
      setLoading(true);
      await deleteItem(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Edit a todo
   */
  const editTodo = useCallback(
    async (id: number, updatedTodo: Partial<Todo>) => {
      try {
        setLoading(true);

        // Simulate the edit locally
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          )
        );

        console.warn(
          "Edit simulated locally. API edit functionality is not supported."
        );

        // Uncomment if API starts supporting editing
        // const updated = await updateItem(id, updatedTodo);
        // setTodos((prev) =>
        //   prev.map((todo) => (todo.id === id ? { ...todo, ...updated } : todo))
        // );
      } catch (error) {
        console.error("Error editing todo:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /**
   * Load more todos
   */
  const loadMoreTodos = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  /**
   * Handle sorting
   */
  const sortedTodos = useMemo(() => {
    if (!sortCriteria) return todos;

    return [...todos].sort((a, b) => {
      const key = sortCriteria.includes("title") ? "title" : "description";
      const order = sortCriteria.includes("asc") ? 1 : -1;
      return (a[key] || "").localeCompare(b[key] || "") * order;
    });
  }, [todos, sortCriteria]);

  /**
   * Calculate displayed todos
   */
  const displayedTodos = useMemo(
    () => sortedTodos.slice(0, page * TODOS_PER_PAGE),
    [sortedTodos, page]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Sidebar */}
      <div className="sidebar p-4 flex items-center justify-center">
        <AddTodoForm addTodo={addTodo} />
      </div>

      {/* Main Content */}
      <div className="content-area p-4">
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
