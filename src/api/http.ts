import axios from "axios";

export const http = axios.create({
  baseURL: "https://api.thecatapi.com/v1",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.CAT_API_KEY as string,
  },
});

export const errorHandler = (error: any) => {
  return error?.message || error || "클라이언트에서 오류가 발생 했습니다.";
};
