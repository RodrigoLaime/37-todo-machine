## intalar temporalmente las herramientas para ejecutarlas, ejecutar alguna funcion y luego borrarlas, esto permite tener la ultima version actualizada de la herramineta que querramos ejecutar
 npx create-react-app <nameCarpeta>
## provar el proyecto
 cd intro-react
 npm start

 ## eventos
 onClick: funcion de click
 onChange: escucha cada ves que cambie el texto de nuestro endpoint
 onMouseOver: activar una accion cuando pase el mous

 ## para ver los commit similar a git log con una interfas grafica
 gitk


 #####################33
 ## para guardar en localstorage 
 primero convertir de objeto en string con el metodo 

const ejemplo = JSON.stringify([{text: 'todo', coppleted: false}])

## para recuperarlo convertirlo en objeto

JSON.parse(ejemplo)

## agregarlo al local storage

localStorage.setItem('ejemplotodo', ejemplo)

## traer de localstorage

JSON.parse(localStorage.getItem('ejemplotodo'))


###
const defaultTodos = [
  { text: 'Cortar cebolla', completed: true },
  { text: 'Tomar el cursso de intro a React', completed: false },
  { text: 'Llorar con la llorona', completed: true },
  { text: 'LALALALAA', completed: false },]; 
undefined
localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos))

##### #########################################333
## cambiar nombre de master a main
git branch -m main

## fucionar remote a local
 git remote add origin <link-git-hub>

## para forsar la sincronizacion
  git pull origin main --allow-unrelated-histories

## borrar rama main estando en la rama master 
git branch -d main

## ver ramas
git branch

## crear ramas
git branch <nameRama>

## moverse de main a master
git checkout master

## merge de main estando en master
git merge main
