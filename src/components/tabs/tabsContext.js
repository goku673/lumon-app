"use client";

import { createContext } from "react";

export const TabsContext = createContext({
  value: "",
  onValueChange: () => {},
});

