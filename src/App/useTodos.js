import React from "react";
import { useLocalStorage } from "./useLocalStorage";


function useTodos() {

  const {
    item: todos, //renombrar
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage('TODOS_V1', [])//se puede cambiar a v2

  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  //para ver cuantos toso tenemos en el array
  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  //filtrar la cantidad de todos dependiendo del valor de searchVaalues
  let searchedTodos = [];
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter(todo => {
      //convertir a minuscula la db
      const todoText = todo.text.toLowerCase();
      //convertir a minuscula el value del input
      const searchText = searchValue.toLowerCase();
      //si incluye lo que escribamos en el input
      return todoText.includes(searchText);
    });
  }



  //funcion para editar todos y se guarda
  const addTodo = (text) => {
    //creamos una copioa de todos
    const newTodos = [...todos]
    //crea un nuevo todo incompleta
    newTodos.push({
      completed: false,
      text,
    });
    //actualizar estado
    saveTodos(newTodos);
  }

  //funcion para editar todos
  const completeTodo = (text) => {
    //buscar el index si todotext es igual al textinput
    const todoIndex = todos.findIndex(todo => todo.text === text);
    //creamos una copioa de todos
    const newTodos = [...todos]
    //encontrar la posicion index dentro de la lista de todos y que de ese objeto que nos esta llamando completed es igual a true
    newTodos[todoIndex].completed = true;
    //actualizar estado
    saveTodos(newTodos);
  }

  //funcion para Eliminar todos
  const deleteTodo = (text) => {
    //buscar el index si todotext es igual al textinput
    const todoIndex = todos.findIndex(todo => todo.text === text);
    //creamos una copioa de todos
    const newTodos = [...todos]
    //en que posicion cortar y cuantas tajadas coratar
    newTodos.splice(todoIndex, 1)
    //actualizar estado
    saveTodos(newTodos);
  }

  //
  return {//indicar cual es el estado que vamos a compartir en todos los componentes que esta conteniendo

    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    searchedTodos,
    addTodo,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    sincronizeTodos
  };
}

export { useTodos };
