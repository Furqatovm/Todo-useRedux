import { createSlice } from "@reduxjs/toolkit";

const date =new Date();
const hour =date.getHours();
const minutes =date.getMinutes();

export const initialState ={
    todo :[]
}

 export const todoApp =createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTodo:(state, action) =>{
            state.todo =[...state.todo, action.payload]
        },
        Check: (state, action) =>{
            const todo =state.todo.find((t) =>t.id ===action.payload);
            if(todo) todo.isPicked =!todo.isPicked;
        },
        deleteTodo: (state, action) =>{
            state.todo =state.todo.filter((val) =>{
               return val.id!==action.payload
            })
        },
        editTodo: (state, action) => {
            const {id, task, isEdited} =action.payload

            const find =state.todo.find(va=> va.id ===id);
            find.task =task;
            find.isEdited =isEdited;
            find.id =id
          }
          
    }
})



export const {addTodo, Check, deleteTodo,editTodo} =todoApp.actions
export default todoApp.reducer