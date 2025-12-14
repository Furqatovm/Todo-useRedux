import { Button, Checkbox, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { addTodo, Check, deleteTodo, initialState } from './todoapp'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegTrashCan } from "react-icons/fa6";


const Todo = () => {
    const todos = useSelector(state => state.todo.todo);

    const date =new Date();
const hour =date.getHours();
const minutes =date.getMinutes();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] =useState("");
    const [picked, setPicked] =useState(false);
  return (
    <div className='max-w-[60%] mx-auto my-auto mt-[3rem]'>
        <h1 className='text-center text-[2rem]'>Todo app</h1>
       <div>
       <form onSubmit={(e)=> {
        e.preventDefault()
        dispatch(addTodo({
            task:inputValue,
            isPicked:false,
            time: `${hour}: ${minutes}`,
            isEdited :picked,
            id: Date.now() + Math.random(),
        }));
        setInputValue("");
       }} className='flex justify-between items-center gap-6'>
            <Input onChange={(e) =>{
                setInputValue(e.target.value);
            }} value={inputValue} />
            <Button htmlType="submit">Qo'shish</Button>
        </form>
        <div className='flex flex-col gap-2 mt-[2rem] w-[80%]'>
          {todos.length >0 ? 
           todos.map((val) =>{
            return (
                <div key={val.id} className='flex gap-2 items-center justify-between border rounded-[5px] p-2 border-gray-300'>
                    <div className='flex gap-2 items-center'>
                    < Checkbox onChange={() =>{dispatch(Check(val.id))}} />
                    <p className={val.isPicked ? "line-through": "none"}>{val.task}</p>
                    </div>
                    <FaRegTrashCan className='hover:text-red-600 cursor-pointer' onClick={()=>{dispatch(deleteTodo(val.id))}} />
                </div>
            )
           }):
           <img src="https://www.shutterstock.com/image-vector/no-data-vector-outline-icon-260nw-2082722071.jpg" className='w-[70%]' alt="salom" />
          }
        </div>

       </div>
    </div>
  )
}

export default Todo