import { useState } from "react";
import { TodoItemProps } from "../models/interfaces";
import { capitalize } from "../utils/stringUtils";

/**
 * Represents a single Todo item with edit and delete functionalities.
 */
const TodoItem = ({ todo, deleteTodo, editTodo }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newDescription, setNewDescription] = useState(todo.description);

  const handleSave = () => {
    editTodo(todo.id, {
      title: capitalize(newTitle),
      description: capitalize(newDescription),
    });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center p-2 border-b">
      {isEditing ? (
        <div className="flex flex-col w-full space-y-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(capitalize(e.target.value))}
            className="p-2 border rounded"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(capitalize(e.target.value))}
            className="p-2 border rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="p-2 text-white rounded save-btn"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-white rounded cancel-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <h3 className="text-lg font-bold">{capitalize(todo.title)}</h3>
            <p>{capitalize(todo.description)}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 text-white rounded edit-btn"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-3 text-white rounded delete-btn"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
