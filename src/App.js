
import './App.css';
import NewList from './components/NewList';
import List from './components/List';
import { useState } from 'react'
import useLocalStorage from './Hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [lists, setLists] = useLocalStorage("lists",[])
  const [image, setImages] = useLocalStorage("images",[])

  const addList = (title) =>{
    let newList = {
      'title': title,
      'tasks': []
    }
    setLists([...lists,newList])
  }

  const addTask = (task,indexList) =>{

    let newImage

    if(task.image != ""){
      console.log(task.image)
       newImage = {
        'id': uuidv4(),
        'image': task.image
      }
      setImages([...image,newImage])
    }

    let newTask = {
      'id': uuidv4(),
      'title': task.title,
      'description': task.description,
      'deadline': task.deadline, 
      'estimatedtime': task.estimatedtime ,
      'priority': task.priority,
      'image': newImage?.id || '',
      'label': task.label ,
      'colorindicator': task.indicator,
      'status': task.status
    }

    let listsClone = [...lists]


    let item = {...listsClone[indexList]}


    item.tasks = [...item.tasks,newTask]

    listsClone[indexList] = item
    
    setLists(listsClone)
  }
 const updateTask = (updatedTask,indexList,image) =>{

    console.log("AAAAAAAAA")
    let listsClone = [...lists]

    let item = {...listsClone[indexList]}

    let index_task

    item.tasks.map((task,index) =>{
      if(task.id==updatedTask.id){
        index_task = index
      }
    })


    item.tasks[index_task] = updatedTask

    listsClone[indexList] = item

    setLists(listsClone)

    console.log(lists)
 }
  return (
    <div className="App">
      <div className= "container">
          <div className="centralized header">
            <span>Ollert</span>
          </div>
          <div className="centralized slogan">
            <span>Keep it Simpler</span>
          </div>
          <div className="content">
            {lists.map((list,index) =>{
              return(
                <List  list={list} index={index} addTask={addTask} updateTask={updateTask}/>
              )
            })}
            <NewList onAddList={addList}/>
          </div>
      </div>
    </div>
  );
}

export default App;
