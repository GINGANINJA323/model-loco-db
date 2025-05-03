import { createContext } from "react";
import { ThemeContextType } from "../types";

// @ts-ignore
const ThemeContext = createContext<ThemeContextType>();

export default ThemeContext;