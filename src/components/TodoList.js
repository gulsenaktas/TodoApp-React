import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faCheck } from '@fortawesome/free-solid-svg-icons'
import { removeTodo, completedTodo, getTodos } from '../redux/todoListSlice'
import { todoListRef } from "../firebase"


function TodoList() {
  const dispatch = useDispatch()
  const todoList = useSelector((state) => state.todoList.data)
  const removeIcon = <FontAwesomeIcon icon={faRemove} />
  const Check = <FontAwesomeIcon icon={faCheck} />

  const updateTodos = () => {
    todoListRef.once('value', (snapshot) => {

      dispatch(getTodos(snapshot.val()))
    }, (errorObject) => {
      console.log('The read failed: ' + errorObject.name);
    });
  }
  useEffect(() => {
    updateTodos()
  }, [])

  const handleRemove = (id) => {
    dispatch(removeTodo(id))
    updateTodos()
  }
  const handleComplete = (id, completed) => {
    dispatch(completedTodo({ id: id, completed: completed }))
    updateTodos()
  }

  return (
    <div>
      <ul className="lists list-group todos">
        {Object.keys(todoList).map(id =>
          < li
            key={id}
            className={`todo list-group-item d-flex justify-content-between align-items-center ${todoList[id].completed ? 'completed' : ''}`}>

            <span>{todoList[id].text}</span>
            <div className='icons'>
              <div
                className={`check icon ${todoList[id].completed ? 'completed' : ''}`}
                onClick={() => handleComplete(id, todoList[id].completed)}
              >
                {Check}
              </div>
              <div
                onClick={() => handleRemove(id)}
                className='remove icon'
              >
                {removeIcon}
              </div>
            </div>
          </li>
        )}
      </ul>
    </div >
  )
}

export default TodoList
