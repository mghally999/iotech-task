/**
 * EmptyState Component
 *
 * This component is displayed when there are no todos in the list.
 * It provides a message encouraging the user to add a new todo.
 *
 * Purpose:
 * - Acts as a placeholder UI to inform the user that the todo list is empty.
 * - Enhances user experience by providing a clear and friendly message.
 */

const EmptyState = () => {
  return (
    // Center-aligned container for the empty state message
    <div className="text-center p-4">
      {/* Heading with a bold message indicating no todos */}
      <h3 className="text-lg font-bold">No Todos Yet</h3>

      {/* Subtext encouraging the user to start adding todos */}
      <p>Start by adding a new todo!</p>
    </div>
  );
};

export default EmptyState;
