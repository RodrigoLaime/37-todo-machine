import React from "react";
function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));

  const {
    sincronizedItem,
    error,
    loading,
    item,
  } = state;

  //ACTION CREATORS
  const onError = (error) => dispatch({ 
    type: actionType.error, 
    payload: error 
  })
  
  const onSuccess = (item) => dispatch({
     type: actionType.success,
      payload: item
     })

  const onSave = (item) => dispatch({
     type: actionType.save,
      payload: item 
    })

  const onSincronise = () => dispatch({
     type: actionType.sincronize,
    })

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

        onSuccess(parsedItem);

      } catch (error) {
        onError(error)
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
      onSave(newItem)
    } catch (error) {
      onError(error)
    }
  }

  const sincronizeItem = () => {
    onSincronise()
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
  success: 'SUCCESS',
  save: 'SAVE',
  sincronize: 'SINCRONIZE'
}

const reducerObject = (state, payload) => ({
  //crear action.type
  [actionType.error]: {
    ...state,
    error: true,
  },
  [actionType.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionType.save]: {
    ...state,
    item: payload,
  },
  [actionType.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  },
})

const reducer = (state, action) => {
  //si no encuentra acton.type devuelve el estado de antes
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage }