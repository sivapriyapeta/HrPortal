import { Children, createContext, useState } from "react";

const user = createContext(null);
const loggedIn = createContext(false);

export {
    user,
    loggedIn
}