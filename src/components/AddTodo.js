import React, { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { db } from "../firebase"
import { setDoc, doc } from "firebase/firestore"


function AddTodo() {
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text) return;

    const docRef = doc(db, "todo-list", nanoid())
    const payload = { text: text, completed: false }
    await setDoc(docRef, payload)
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