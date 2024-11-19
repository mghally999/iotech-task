import { useState, useCallback, useMemo, useEffect } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import EmptyState from "./components/EmptyState";
import { Todo } from "./models/Todo";
import { fetchItems } from "./services/api";
import { TODOS_PER_PAGE } from "./config/constants";
import "./styles/index.css";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState(1);

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

  const addTodo = useCallback((title: string, description: string) => {
    setTodos((prev) => [{ id: Date.now(), title, description }, ...prev]);
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback((id: number, updatedTodo: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
  }, []);

  const loadMoreTodos = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const displayedTodos = useMemo(
    () => todos.slice(0, page * TODOS_PER_PAGE),
    [todos, page]
  );

  return (
    <div className="app-container grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="sidebar p-4 bg-gray-800 text-white flex items-center justify-center">
        <AddTodoForm addTodo={addTodo} />
      </div>
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
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default App;
