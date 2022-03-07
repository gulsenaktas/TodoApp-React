import React, { useState } from 'react'
// import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { addTodo, getTodos } from '../redux/todoListSlice'
import { todoListRef } from "../firebase"


function AddTodo() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    if (!text) return;
    e.preventDefault()

    dispatch(addTodo({ text: text, completed: false }))

    todoListRef.once('value', (snapshot) => {
      dispatch(getTodos(snapshot.val()))
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    });
    setText('')
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="text-center my-4">
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