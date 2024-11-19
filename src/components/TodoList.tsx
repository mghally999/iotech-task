import { Todo } from "../models/Todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  loadMore: () => void;
  hasMore: boolean;
}

const TodoList = ({
  todos,
  deleteTodo,
  editTodo,
  loadMore,
  hasMore,
}: TodoListProps) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
      {hasMore && (
        <button
          onClick={loadMore}
          className="w-full p-3 text-lg font-bold text-white bg-yellow-500 rounded load-more-btn"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default TodoList;
