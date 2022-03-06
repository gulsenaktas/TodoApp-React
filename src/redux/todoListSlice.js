import { createSlice } from '@reduxjs/toolkit'

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: {
    data: [
      {
        id: 1,
        text: 'play game',
        completed: false
      },
      {
        id: 2,
        text: 'play game',
        completed: false
      },
      {
        id: 3,
        text: 'play game',
        completed: false
      }
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      state.data.push(action.payload)
    },
    removeTodo: (state, action) => {
      const id = action.payload
      const filtered = state.data.filter(item => item.id !== id)
      state.data = filtered
    },
    completedTodo: (state, action) => {
      const id = action.payload
      // const item = state.data.find(item => item.id === id)
      // item.completed = !item.completed
      const newdata = state.data.map(item => {
        if (item.id === id) {
          const todo = { ...item, completed: !item.completed }
          return todo
        } else {
          return item
        }
      })
      state.data = newdata
    },
    searchTodo: (state, action) => {
      const filtered = state.data.filter(item => item.text.toLowerCase().includes(action.payload))
        .forEach((todo) => todo.classList.add("none"));
    }
  },
})

export const { addTodo, removeTodo, completedTodo, searchTodo } = todoListSlice.actions

export default todoListSlice.reducer