import React from "react";
function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));

  const {
    sincronizedItem,
    error,
    loading,
    item,
  } = state;

  /*   //Estado de sincronized
    const [sincronizedItem, setSincronizedItem] = React.useState(true);
    // estado de erro
    const [error, setError] = React.useState(false);
    // estado de loading
    const [loading, setLoading] = React.useState(true);
    // estado de todos
    const [item, setItem] = React.useState(initialValue); */

  React.useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName)
        //nuestro estado por defecto
        let parsedItem;

        //si no hay nada creado
        if (!localStorageItem) {
          //crear por defecto una lista bacia transformando a string
          localStorage.setItem(itemName, JSON.stringify(initialValue));//cambiar el array por initialValue=[]
          parsedItem = initialValue;
        } else { //si ya hay algocreado
          //obtenemos los datos transformando el string a object
          parsedItem = JSON.parse(localStorageItem)
        }

        //actualize el valor del estado
        setItem(parsedItem)

        //quitar el loading
        setLoading(false)

        setSincronizedItem(true)

      } catch (error) {
        dispatch({ type: actionType.error, payload: error })
        setError(error)
      }
    }, 3000);
  }, [sincronizedItem]);


  //Eliminar o guardar las actualizaciones completas con persistencia en localstorage 
  //no se ejecuta por defecto solo permite actualizarlo, no espera a que la app cargue  
  const saveItem = (newItem) => {
    try {
      //convertimos a string Item nuestros Item
      const stringifiedItem = JSON.stringify(newItem)
      //persistencia
      localStorage.setItem(itemName, stringifiedItem)
      //evitar recargar la pagina, permite quedar con la ultima version
      setItem(newItem)
    } catch (error) {
      setError(error)
    }
  }

  const sincronizeItem = () => {
    setLoading(true)
    setSincronizedItem(false)
  }

  //actualizar los elementos
  return { //si tenemos mas estados en un mismo cutomReactHook no se envia [...] sino un {...}
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  };
}//final funcio localstorague

const initialState = ({ initialValue }) => ({
  sincronizedItem: true,
  error: false,
  loading: true,
  item: initialValue,
})
const actionType = {
  error: 'ERROR',
}
const reducerObject = (state, payload) => {
  //crear action.type
}

const reducer = (state, action) => {
  //si no encuentra acton.type devuelve el estado de antes
  reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage }