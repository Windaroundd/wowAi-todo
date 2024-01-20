import React, { useState } from "react";

import { banner_img } from "../../components/Images";

import TodoSection from "../../components/todo/TodoSection";
import AddTodo from "../../components/todo/AddTodo";
import { COMPLETED, PENDING, TODO } from "../../contanst";
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListAtom } from "./recoil";

const data = [
  {
    id: Date.now(),
    title: "title",
    description: "description",
    status: "todo" | "pending" | "completed",
  },
];

const Home = () => {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [date, setDate] = useState(new Date());

  return (
    <div className="app">
      <div className="app-header relative h-[215px] overflow-hidden ">
        <img src={banner_img} alt="" />
      </div>
      <div className="app-body relative p-5">
        <div className="relative ">
          <div>
            <h2 className="text-2xl font-semibold">My Tasks</h2>
            <p>
              {date.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <AddTodo />
        <TodoSection title={TODO} todoList={todoList} />
        <TodoSection title={PENDING} todoList={todoList} />
        <TodoSection title={COMPLETED} todoList={todoList} />
      </div>
    </div>
  );
};

export default Home;
