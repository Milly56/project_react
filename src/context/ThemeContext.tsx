    "use client";

    import { createContext, useContext, useEffect, useState } from "react";

    interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
    }

    const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggleTheme: () => {},
    });

    export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);

        if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
        } else {
        document.documentElement.classList.remove("dark");
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
        </ThemeContext.Provider>
    );
    }

    export function useTheme() {
    return useContext(ThemeContext);
    }
