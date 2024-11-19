export interface Todo {
  id: number;
  title: string;
  description: string;
}

export interface AddTodoFormProps {
  addTodo: (title: string, description: string) => void;
}

export interface TodoItemProps {
  todo: Todo;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
}

export interface TodoListProps {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  loadMore: () => void;
  hasMore: boolean;
}
