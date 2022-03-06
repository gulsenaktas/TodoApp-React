import React, { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addTodo } from '../redux/todoListSlice'


function AddTodo() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    if (!text) return;
    e.preventDefault()

    dispatch(addTodo({ id: nanoid(), text: text, completed: false }))
    setText(' ')
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="text-center my-4">
        <label>Add a new todo...</label>
        <div className='form-elements'>
          <input
            className="form-control m-auto"
            id="input"
            type="text"
            name="add"
            autoComplete="off"
            value={text}
            onChange={e => setText(e.target.value)}
          >
          </input>
          <button className='add-button'>Add</button>
        </div>

      </form>
    </div>
  )
}

export default AddTodo