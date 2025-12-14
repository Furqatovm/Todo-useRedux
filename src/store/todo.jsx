import { Button, Checkbox, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { addTodo, Check, deleteTodo, editTodo, initialState } from './todoapp'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegTrashCan } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';
import { FaRegEdit } from "react-icons/fa";


const Todo = () => {
    const todos = useSelector(state => state.todo.todo);

    const date =new Date();
const hour =date.getHours();
const minutes =date.getMinutes();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] =useState("");
    const [edited, isEdited] =useState(false);
    const [id, setId] =useState("")


    const [picked, setPicked] =useState(false);
  return (
    <div className='max-w-[60%] mx-auto my-auto mt-[3rem] max-md:max-w-[90%]'>
        <h1 className='text-center text-[2rem]'>Todo app</h1>
        <Toaster />
       <div>
       <form onSubmit={(e)=> {
        e.preventDefault()
        if(!edited){
            dispatch(addTodo({
                task:inputValue,
                isPicked:false,
                time: `${hour}: ${minutes}`,
                isEdited :picked,
                id: Date.now() + Math.random()
            }));
            toast.success("Muvaffaqiyatli qo'shildi")
        } else{
            dispatch(editTodo({
                task:inputValue,
                isPicked:picked,
                time: `${hour}: ${minutes}`,
                isEdited:true,
                id:id
            }));
            isEdited(false)
            toast.success("Ma'lumotlar yangilandi")
        }
        setInputValue("");
       }} className='flex justify-between items-center gap-6'>
            <Input required  onChange={(e) =>{
                setInputValue(e.target.value);
            }} value={inputValue} />
            <Button htmlType="submit">{edited ? "Save": "Qo'shish"}</Button>
        </form>
        <h2>Jami: {todos.length}</h2>
        <div className='flex flex-col gap-2 mt-[2rem] w-[80%] max-md:w-[100%]'>
          {todos.length >0 ? 
           todos.map((val) =>{
            return (
                <div key={val.id} className='flex gap-2 items-center justify-between border rounded-[5px] p-2 border-gray-300'>
                    <div className='flex gap-2 items-center'>
                    < Checkbox onChange={() =>{dispatch(Check(val.id))}} />
                    <p className={val.isPicked ? "line-through": "none"}>{val.task}</p>
                    </div>
                  <div className='flex gap-3 items-center'>
                    <FaRegEdit className='hover:text-green-500 cursor-pointer' onClick={() =>{
                        const wantEdit =val.task;
                        setInputValue(wantEdit)
                        isEdited(true);
                        setId(val.id)
                        
                    }} />
                  <FaRegTrashCan className='hover:text-red-600 cursor-pointer' onClick={()=>{
                        dispatch(deleteTodo(val.id));
                        toast.error("O'chirib tashlandi")
                        }} />
                  </div>
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