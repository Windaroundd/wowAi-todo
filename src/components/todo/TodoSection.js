import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

const HAS_TODO = 1;

const TodoSection = ({ title, todoList }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let newData = todoList?.filter((item) => {
      return item.status === title;
    });

    setData(newData);
  }, [todoList]);

  return (
    <div className="mt-4">
      <h3 className="app-title mb-2 text-xl font-semibold">{title}:</h3>
      {data.length >= HAS_TODO ? (
        data.map((item) => {
          return <TodoCard key={item.id} data={item} />;
        })
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default TodoSection;
