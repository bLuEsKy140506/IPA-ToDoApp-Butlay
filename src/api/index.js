// TIP: MAKE SURE to include "Content-Type" header with the value of "application/json"
// also don't forget that the body should contain JSON-formatted data

const BASE_URL = "http://localhost:3000";

export const todoAPI = {
  fetchAll: () => fetch(`${BASE_URL}/todos`).then((res) => res.json()),
  fetchSequences: () => fetch(`${BASE_URL}/sequence`).then((res) => res.json()),
  updateOne: async (id) => {
    // TODO: return a fetch call to an appropriate API route to update todo
    // URL: /todos/{id} -- the id here is the id value of the todo item to be updated
    // HINT: to update an existing record you need to use PATCH method
    // console.log(id);
    const data = id;
    // console.log(data);
    const options = {
      method: "PATCH",
      body: JSON.stringify({ state: data.state }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`${BASE_URL}/todos/${data.id}`, options);
    return await res.json();
  },
  createOne: (todo) => {
    // TODO: return a fetch call to an appropriate API route to create todo
    // URL: /todos
    // HINT: to create a new todo item is to use POST method
    const data = todo;

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    return fetch(`${BASE_URL}/todos`, options).then((res) => {
      return res.json();
    });
  },

  deleteOne: async (id) => {
    // TODO: return a fetch call to an appropriate API route to delete todo
    // URL: /todos/{id} -- the id here is the id value of the todo item to be deleted
    // HINT: to delete a todo item use DELETE method
    const options = {
      method: "DELETE",
      body: JSON.stringify(id),
    };
    const res = await fetch(`${BASE_URL}/todos/${id}`, options);
    return await res.json();
  },
};
