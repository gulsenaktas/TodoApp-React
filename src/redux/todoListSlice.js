import { createSlice } from '@reduxjs/toolkit'


export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    data: [],
  },
  reducers: {
    getTodos: (state, action) => {
      state.data.push(action.payload)
    },
    removeTodo: (state, action) => {
      const filtered = state.data.filter(e => e.id !== action.payload)
      state.data = filtered
    },
    completedTodo: (state, action) => {
      const toggleTodo = state.data.find(e => e.id === action.payload)
      toggleTodo.completed = !toggleTodo.completed
    }
  },
})

export const { getTodos, removeTodo, completedTodo, } = todoListSlice.actions

export default todoListSlice.reducer