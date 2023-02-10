import React from "react";
import './TodoForm.css'

function TodoForm({
  addTodo,
  setOpenModal,
}) {
  //stado del texarea es un string vacio
  const [newTodoValue, setNewTodoValue] = React.useState('')

  //cada que se escrive
  const onChange = (event) => {
    setNewTodoValue(event.target.value)
  }

  //buton cancelar
  const onCancel = () => {
    //cierra el modal
    setOpenModal(false)
  }
  //buton enviar
  const onSubmit = (event) => {
    //cancela recargar la pagina
    event.preventDefault();
    //le enviamos el nuevo texto
    addTodo(newTodoValue)
    //cierra el modal
    setOpenModal(false)
  }
  return (
    <form onSubmit={onSubmit}>
      <label>Escribe tu nuevo TODO</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Make dinner"
      />
      <div className="TodoForm-buttonContainer">
        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
        >
          Cancelar
        </button>
        <button
          className="TodoForm-button TodoForm-button--add"
          type="submit"
        >
          Añadir
        </button>
      </div>
    </form>

  )
}

export { TodoForm };