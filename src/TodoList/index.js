import React from "react";
import './TodoList.css'

function TodoList(props) {

  const renderFunc = props.children || props.render

  return (
    <section className="TodoList-container">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}

      {/* si loading no es true y no tenemos totalTodos mostramos la propiedad EmptyTodos */}
      {(!props.loading && !props.totalTodos) && props.onEmptyTodos()}

      {/* si crean todos */}
      {(!!props.totalTodos && !props.searchedTodos.length) && props.onEmptySearchResults(props.searchText)}

      {/* si las validaciones anteriores no funcinan
      recorrer el array y devolver todoItem  */}
      {(!props.loading && !props.error) && props.searchedTodos.map(renderFunc)}

      <ul>
        {props.children}
      </ul>
    </section>
  );
}

export { TodoList };