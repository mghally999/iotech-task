import TodoItem from "./TodoItem";
import { TodoListProps } from "../models/interfaces";

/**
 * TodoList Component
 *
 * Displays a list of todos with support for editing, deleting, and loading more items.
 *
 * Props:
 * - `todos`: Array of todo objects to display.
 * - `deleteTodo`: Function to delete a todo by id.
 * - `editTodo`: Function to edit a todo by updating its title or description.
 * - `loadMore`: Function to load additional todos when needed.
 * - `hasMore`: Boolean indicating if more todos are available to load.
 */
const TodoList = ({
  todos,
  deleteTodo,
  editTodo,
  loadMore,
  hasMore,
}: TodoListProps) => {
  return (
    <div className="space-y-4">
      {/* Render each todo item */}
      {todos.map((todo) => (
        <TodoItem
          key={todo.id} // Use unique id for each todo
          todo={todo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}

      {/* Display 'Load More' button if there are more todos */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMore} // Load more todos when clicked
            className="w-1/2 p-2 text-lg font-bold text-white rounded load-more-btn"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoList;
