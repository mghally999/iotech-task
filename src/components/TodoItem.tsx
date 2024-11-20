import { useState } from "react";
import { TodoItemProps } from "../models/interfaces";
import { capitalize } from "../utils/stringUtils";

/**
 * TodoItem Component
 *
 * Represents a single todo item with functionalities to edit and delete.
 *
 * Props:
 * - `todo`: The todo object containing `id`, `title`, and `description`.
 * - `deleteTodo`: A function to delete the todo by its ID.
 * - `editTodo`: A function to edit the todo's title or description by its ID.
 *
 * Features:
 * - Displays the todo's title and description.
 * - Allows the user to edit the todo in-place with an input and textarea.
 * - Provides buttons for editing, saving, canceling edits, and deleting.
 */

const TodoItem = ({ todo, deleteTodo, editTodo }: TodoItemProps) => {
  // Local state to track whether the item is in editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Local state for managing the updated title during editing
  const [newTitle, setNewTitle] = useState(todo.title);

  // Local state for managing the updated description during editing
  const [newDescription, setNewDescription] = useState(todo.description);

  /**
   * handleSave
   *
   * Saves the updated title and description, capitalizes them,
   * and calls the `editTodo` function with the updated data.
   * Exits the editing mode after saving.
   */
  const handleSave = () => {
    editTodo(todo.id, {
      title: capitalize(newTitle),
      description: capitalize(newDescription),
    });
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className="flex justify-between items-center p-2 border-b space-x-4">
      {isEditing ? (
        // Editing mode UI
        <div className="flex flex-col w-full space-y-2">
          {/* Input for editing the title */}
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(capitalize(e.target.value))}
            className="p-2 border rounded"
          />

          {/* Textarea for editing the description */}
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(capitalize(e.target.value))}
            className="p-2 border rounded"
          />

          {/* Buttons for saving or canceling the edits */}
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
        // Default (view-only) UI
        <>
          {/* Display the todo's title and description */}
          <div className="flex-grow">
            <h3 className="text-lg font-bold">{capitalize(todo.title)}</h3>
            <p>{capitalize(todo.description)}</p>
          </div>

          {/* Buttons for editing and deleting the todo */}
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
