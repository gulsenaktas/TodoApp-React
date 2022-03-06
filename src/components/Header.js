import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { searchTodo } from '../redux/todoListSlice'


function Header() {
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')

  const handleKeyup = (e) => {
    console.log(search);
    dispatch(searchTodo(search))
  }
  return (
    <div>
      <header className="text-center text-light my-4">
        <h1 className="title mb-4">Todo List</h1>

        <form onKeyUp={handleKeyup} className="search">
          <input
            className="form-control m-auto"
            type="text"
            name="search"
            value={search}
            placeholder="search todos"
            autoComplete="off"
            onChange={e => setSearch(e.target.value)} />
        </form>
      </header>
    </div>
  )
}

export default Header