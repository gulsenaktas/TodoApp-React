import './App.css';
import Header from './components/Header';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  return (
    <div className="App">
      <div className="clips"></div>
      <div className="wrapper">
        <Header />
        <TodoList />
        <AddTodo />
      </div>
    </div>
  );
}

export default App;
