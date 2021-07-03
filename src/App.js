
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

  const deleteList = (indexList) =>{
    let listsClone = [...lists]
    listsClone.splice(indexList,1)
    setLists(listsClone)
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
      'image': newImage?.image || '',
      'label': task.label ,
      'color': task.color,
      'status': task.status
    }

    console.log(newTask)

    let listsClone = [...lists]


    let item = {...listsClone[indexList]}


    item.tasks = [...item.tasks,newTask]

    listsClone[indexList] = item
    
    setLists(listsClone)
  }

  const getTask = (id) =>{
      let task_name

      lists.map((list,index) =>{
        list.tasks.map((task,index) =>{
          if(task.id==id){
            task_name = task.title
          }
        })
      })

      return task_name
  }
  
  const deleteTask = (indexTask,indexList) => {
    let listsClone = [...lists]

    let item = {...listsClone[indexList]}
    let item_sla = item.tasks.splice(indexTask,1)

    listsClone[indexList] = item

    setLists(listsClone)
  }

 const updateTask = (updatedTask,indexList,image) =>{

    let listsClone = [...lists]

    let item = {...listsClone[indexList]}
    console.log(indexList)

    let index_task

    item.tasks.map((task,index) =>{
      if(task.id==updatedTask.id){
        index_task = index
      }
    })


    item.tasks[index_task] = updatedTask

    listsClone[indexList] = item

    setLists(listsClone)
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
                <List  list={list} indexList={index} addTask={addTask} updateTask={updateTask} key={index} 
                deleteTask={deleteTask} getTask={getTask} deleteList={deleteList}/>
              )
            })}
            <NewList onAddList={addList}/>
          </div>
      </div>
    </div>
  );
}

export default App;
