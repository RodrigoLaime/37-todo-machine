import React from 'react';
import { useTodos } from './useTodos';
import { TodoHeader } from '../TodoHeader';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { TodosError } from '../TodosError'
import { TodosLoading } from '../TodosLoading'
import { EmptyTodos } from '../EmptyTodos'
import { TodoForm } from '../TodoForm';
import { CreateTodoButton } from '../CreateTodoButton';
import { Modal } from '../Modal';
import { ChangeAlert } from '../ChangeAlert';
import './App.css'

function App() {

  const {
    states, 
    stateUpdaters,
  } = useTodos();//useTodos es un hook

  const {//propiedades del estado
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
  } = states;
  
  const {//actualizadores
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos
  } = stateUpdaters;

  return (

    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={
          (searchText) => <p className='result'>No hay resultados para <span>{searchText}</span></p>
        }
      >
        {todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      </TodoList>


      {!!openModal && (
        <Modal>
          <TodoForm
            addTodo={addTodo}
            setOpenModal={setOpenModal}
          />
        </Modal>
      )}

      <CreateTodoButton
        setOpenModal={setOpenModal}
      />
      <ChangeAlert
        sincronize={sincronizeTodos}
      />
    </React.Fragment >

  );
}

export default App;
