import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faCheck } from '@fortawesome/free-solid-svg-icons'
import { removeTodo, completedTodo, getTodos } from '../redux/todoListSlice'
import { db } from "../firebase"
import { collection, onSnapshot, setDoc, deleteDoc, doc } from "firebase/firestore"


function TodoList() {
  const dispatch = useDispatch()
  const todoList = useSelector((state) => state.todoList.data)
  const removeIcon = <FontAwesomeIcon icon={faRemove} />
  const Check = <FontAwesomeIcon icon={faCheck} />

  useEffect(() => {
    const databaseCollection = collection(db, "todo-list")
    //onSnapshot function watch changes on database collection
    onSnapshot(databaseCollection, (snapshot) => {
      snapshot.docChanges().forEach(change => {
        const id = change.doc.id
        if (change.type === "added") {
          const todo = { ...change.doc.data(), id: id }
          dispatch(getTodos(todo))
        } else if (change.type === "modified") {
          dispatch(completedTodo(id))
        } else if (change.type === "removed") {
          dispatch(removeTodo(id))
        }
      })
    });
  }, [])

  const handleRemove = async (id) => {
    const docRef = doc(db, "todo-list", id)
    await deleteDoc(docRef)
  }

  const handleComplete = async (todo) => {
    const docRef = doc(db, "todo-list", todo.id)
    const payload = { text: todo.text, completed: !todo.completed }
    await setDoc(docRef, payload)
  }

  return (
    <div>
      <ul className="lists list-group todos">
        {
          todoList.length ?
            todoList.map(todo =>
              < li
                key={todo.id}
                className={`todo list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}`}>

                <span>{todo.text}</span>
                <div className='icons'>
                  <div
                    className={`check icon ${todo.completed ? 'completed' : ''}`}
                    onClick={() => handleComplete(todo)}
                  >
                    {Check}
                  </div>
                  <div
                    onClick={() => handleRemove(todo.id)}
                    className='remove icon'
                  >
                    {removeIcon}
                  </div>
                </div>
              </li>
            )
            :
            <p className='empty-list'>Oh! There is no to-do yet.</p>
        }
      </ul>
    </div >
  )
}

export default TodoList
