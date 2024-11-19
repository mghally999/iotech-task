import axios from "axios";
import { Todo } from "../models/Todo";

const API_URL = "https://jsonplaceholder.typicode.com";
const QUOTE_API_URL = "https://api.quotable.io/quotes?limit=20";

export const fetchItems = async (): Promise<Todo[]> => {
  try {
    // Fetch todos from JSONPlaceholder
    const todosResponse = await axios.get(`${API_URL}/todos?_limit=20`);
    const todosData = todosResponse.data;

    // Fetch quotes from Quotable API
    const quotesResponse = await axios.get(QUOTE_API_URL);
    const quotesData = quotesResponse.data.results;

    // Combine todos with quotes
    return todosData.map((item: any, index: number) => ({
      id: item.id,
      title: item.title || "Untitled Task",
      description:
        quotesData[index % quotesData.length].content ||
        "No description available",
    }));
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
