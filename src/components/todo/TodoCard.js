import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";

import { todoListAtom } from "../../pages/Home/recoil";
import { localServices } from "../../services/localServices";
import { COMPLETED, PENDING } from "../../contanst";

import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { calculateDateRemain } from "../../utils/dateUtils";

const TodoCard = ({ data }) => {
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [editMode, setEditMode] = useState(false);

  let titleRef = useRef(null);
  let descRef = useRef(null);

  const handleEditTodo = (todoId) => {
    setTodoList((todoList) => {
      let _newTodo = [...todoList];
      const index = _newTodo.findIndex((item) => item.id === todoId);
      const updatedTodo = {
        ..._newTodo[index],
        title: titleRef?.current?.innerText,
        desc: descRef?.current?.innerText,
      };
      _newTodo[index] = updatedTodo;
      localServices.set(_newTodo);
      return _newTodo;
    });
    setEditMode(false);
  };

  const handleChangeStatus = (todoId, status) => {
    setTodoList((todoList) => {
      let _newTodo = [...todoList];
      const index = _newTodo.findIndex((item) => item.id === todoId);
      const updatedTodo = { ..._newTodo[index], status: status };
      _newTodo[index] = updatedTodo;
      localServices.set(_newTodo);
      return _newTodo;
    });
  };
  const handleDeleteStatus = (todoId) => {
    setTodoList((todoList) => {
      let _newTodo = [...todoList];
      _newTodo = _newTodo.filter((item) => item.id !== todoId);
      localServices.set(_newTodo);
      return _newTodo;
    });
  };

  useEffect(() => {
    titleRef?.current?.focus();
  }, [editMode]);

  return (
    <div className="todo-card mb-2  flex items-center gap-4">
      <div className="w-3/5">
        <h4
          className="font- text-base"
          contentEditable={editMode}
          suppressContentEditableWarning={editMode}
          ref={titleRef}
        >
          {data?.title}
        </h4>
        <p
          className="text-sm font-light"
          contentEditable={editMode}
          suppressContentEditableWarning={editMode}
          ref={descRef}
        >
          {data?.desc}
        </p>
        {data.deadline && (
          <p>
            Deadline: {Math.round(calculateDateRemain(new Date(data.deadline)))}{" "}
            days remain
          </p>
        )}
      </div>
      <div className="flex w-2/5 items-center justify-end  gap-4">
        {!editMode ? (
          <button
            onClick={() => {
              setEditMode(true);
            }}
          >
            <CiEdit className="h-7 w-7" />
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                handleEditTodo(data.id);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                if (titleRef.current) {
                  titleRef.current.innerText = data.title;
                  descRef.current.innerText = data.desc;
                }
                setEditMode(false);
              }}
            >
              Cancel
            </button>
          </>
        )}
        <button
          onClick={() => {
            handleChangeStatus(data.id, PENDING);
          }}
        >
          <MdOutlinePending
            className="h-7 w-7 rounded-full"
            style={{
              color: data.status === PENDING ? "#80BCBD" : "",
            }}
          />
        </button>
        <button
          onClick={() => {
            handleChangeStatus(data.id, COMPLETED);
          }}
        >
          <FaRegCheckCircle
            className="h-6 w-6"
            style={{
              color: data.status === COMPLETED ? "#80BCBD" : "",
            }}
          />
        </button>
        <button
          onClick={() => {
            handleDeleteStatus(data.id);
          }}
        >
          <RiDeleteBin5Line className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
