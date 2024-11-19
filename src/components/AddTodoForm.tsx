import { useState } from "react";
import { capitalize } from "../utils/stringUtils";

interface AddTodoFormProps {
  addTodo: (title: string, description: string) => void;
}

const AddTodoForm = ({ addTodo }: AddTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addTodo(title, description);
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-between space-y-4"
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(capitalize(e.target.value))}
        className="w-full p-3 text-lg border rounded adding-input"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(capitalize(e.target.value))}
        className="w-full p-3 text-lg border rounded adding-description"
      />
      <button
        type="submit"
        className="p-3 text-lg font-bold text-white bg-yellow-500 rounded add-btn"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddTodoForm;
