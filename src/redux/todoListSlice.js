import { createSlice } from '@reduxjs/toolkit'
import { todoListRef } from "../firebase"


export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    data: [],
  },
  reducers: {
    getTodos: (state, action) => {
      state.data = action.payload
    },
    addTodo: (state, action) => {
      todoListRef.push(action.payload)
    },
    removeTodo: (state, action) => {
      todoListRef.child(action.payload).remove()
    },
    completedTodo: (state, action) => {
      todoListRef.child(action.payload.id).update({ completed: !action.payload.completed })

    }
  },
})

export const { addTodo, removeTodo, completedTodo, getTodos } = todoListSlice.actions

export default todoListSlice.reducer