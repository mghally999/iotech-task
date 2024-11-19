import { useState } from "react";
import { Todo } from "../models/Todo";
import { capitalize } from "../utils/stringUtils";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
}

const TodoItem = ({ todo, deleteTodo, editTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(capitalize(todo.title));
  const [newDescription, setNewDescription] = useState(
    capitalize(todo.description)
  );

  const handleSave = () => {
    editTodo(todo.id, {
      title: capitalize(newTitle),
      description: capitalize(newDescription),
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex flex-col p-4 space-y-2 border rounded">
        {" "}
        {/* Removed bg-gray-800 */}
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(capitalize(e.target.value))}
          className="p-2 border rounded text-black"
        />
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(capitalize(e.target.value))}
          className="p-2 border rounded text-black"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSave}
            className="p-2 text-white bg-green-600 rounded save-btn"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="p-2 text-white bg-red-600 rounded cancel-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div>
        <h3 className="text-lg font-bold">{capitalize(todo.title)}</h3>
        <p>{capitalize(todo.description)}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-3 text-lg font-bold text-white rounded edit-btn"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(todo.id)}
          className="p-3 text-lg font-bold text-white rounded delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
