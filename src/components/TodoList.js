import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRemove, faCheck } from '@fortawesome/free-solid-svg-icons'
import { removeTodo, completedTodo } from '../redux/todoListSlice'


function TodoList() {
  const dispatch = useDispatch()
  const todoList = useSelector((state) => state.todoList.data)
  const removeIcon = <FontAwesomeIcon icon={faRemove} />
  const Check = <FontAwesomeIcon icon={faCheck} />
  return (
    <div>
      <ul className="lists list-group todos">
        {todoList.map(item =>
          <li
            key={item.id}
            className={`todo list-group-item d-flex justify-content-between align-items-center ${item.completed ? 'completed' : ''}`}>

            <span>{item.text}</span>
            <div className='icons'>
              <div className={`check icon ${item.completed ? 'completed' : ''}`} onClick={() => dispatch(completedTodo(item.id))}>{Check}</div>
              <div onClick={() => dispatch(removeTodo(item.id))} className='remove icon'>{removeIcon}</div>
            </div>
          </li>
        )}
      </ul>
    </div >
  )
}

export default TodoList