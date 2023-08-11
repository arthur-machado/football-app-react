import axios from "axios";

export const API = axios.create({
  baseURL: "https://api-football-standings.azharimm.dev",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
