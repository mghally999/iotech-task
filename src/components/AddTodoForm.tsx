import { useState } from "react";
import { AddTodoFormProps } from "../models/interfaces";
import { capitalize } from "../utils/stringUtils";

/**
 * AddTodoForm Component
 *
 * This component provides a form to add new todos with a title and description.
 * It uses local state to manage input values and passes the data to a parent
 * component through the `addTodo` function when the form is submitted.
 */

const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
  // State for managing the title input field
  const [title, setTitle] = useState("");

  // State for managing the description input field
  const [description, setDescription] = useState("");

  /**
   * handleSubmit
   * This function is called when the form is submitted. It prevents the default
   * form submission behavior, validates the inputs, and calls the `addTodo`
   * function passed from the parent component with the title and description.
   * It also resets the input fields after a successful submission.
   *
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior (e.g., page refresh)

    // Check if title and description are not empty
    if (title.trim() && description.trim()) {
      addTodo(title, description); // Pass the data to the parent component
      setTitle(""); // Reset the title input field
      setDescription(""); // Reset the description input field
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-4"
      // Tailwind classes ensure proper spacing and alignment
    >
      {/* Input field for the todo title */}
      <input
        type="text"
        placeholder="Title" // Placeholder text for the title field
        value={title} // Controlled component bound to `title` state
        onChange={(e) => setTitle(capitalize(e.target.value))} // Update state with capitalized input
        className="w-full p-3 text-lg border rounded adding-input"
        // Styling ensures a full-width input with padding and rounded corners
      />

      {/* Textarea field for the todo description */}
      <textarea
        placeholder="Description" // Placeholder text for the description field
        value={description} // Controlled component bound to `description` state
        onChange={(e) => setDescription(capitalize(e.target.value))} // Update state with capitalized input
        className="w-full p-3 text-lg border rounded adding-description"
        // Styling matches the title input field for consistent design
      />

      {/* Submit button for the form */}
      <button
        type="submit"
        className="p-3 text-white rounded add-btn"
        // Styling ensures padding and white text with a custom Tailwind class for color
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
