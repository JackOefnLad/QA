import * as nodeFetch from "node-fetch";
//Создание метода для получения токена
//при авторизации, метод nodeFetch отправляет запрос на URL с телом(тело принимает строку JSON.str преврашает в строку)
//и результат хранится в response
export const getLoginToken = async (username, password) => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "Post",
    body: JSON.stringify({ username: username, password: password }),
  });
  if (response.status !== 200) {
    throw new Error("Ошибка авторизации");
  }
  const body = await response.json();
  return body.token;
};
