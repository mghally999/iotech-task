import axios from "axios";
import { Todo } from "../models/interfaces";

// Base URL for JSONPlaceholder API
const API_URL = "https://jsonplaceholder.typicode.com";
// Base URL for Quotable API
const QUOTE_API_URL = "https://api.quotable.io/quotes?limit=20";

/**
 * Fetches todos and corresponding quotes from two APIs and combines them into one list.
 * @returns A Promise that resolves to an array of combined Todo items with quotes as descriptions.
 */
export const fetchItems = async (): Promise<Todo[]> => {
  try {
    // Fetch todos from JSONPlaceholder
    const todosResponse = await axios.get(`${API_URL}/todos?_limit=20`);
    const todosData = todosResponse.data;

    // Fetch quotes from Quotable API
    const quotesResponse = await axios.get(QUOTE_API_URL);
    const quotesData = quotesResponse.data.results;

    // Map todos and pair them with quotes for descriptions
    return todosData.map((item: any, index: number) => ({
      id: item.id,
      title: item.title || "Untitled Task",
      description:
        quotesData[index % quotesData.length]?.content ||
        "No description available",
    }));
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
