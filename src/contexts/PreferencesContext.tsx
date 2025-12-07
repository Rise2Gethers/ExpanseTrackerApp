import React, { createContext, useState, useContext, useMemo } from "react";

// O Contrato
interface PreferencesContextType {
  isThemeDark: boolean;
  toggleTheme: () => void;
}

// O Contexto vazio
export const PreferencesContext = createContext<PreferencesContextType>({
  isThemeDark: false,
  toggleTheme: () => {},
});

// O Provider (A "Antena" que vai envolver o app)
export const PreferencesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isThemeDark, setIsThemeDark] = useState(false);

  const toggleTheme = () => setIsThemeDark(!isThemeDark);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [isThemeDark],
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => useContext(PreferencesContext);
