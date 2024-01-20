const TODO_LIST = "TODO-LIST";

export const localServices = {
  set: (todoList) => {
    let todoListJson = JSON.stringify(todoList);
    localStorage.setItem(TODO_LIST, todoListJson);
  },
  get: () => {
    let todoListJson = localStorage.getItem(TODO_LIST);
    if (todoListJson) {
      return JSON.parse(todoListJson);
    } else {
      return [];
    }
  },
};
