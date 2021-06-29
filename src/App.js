
import './App.css';
import NewList from './components/NewList';
import List from './components/List';
import { useState } from 'react'
import useLocalStorage from './Hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [lists, setLists] = useLocalStorage("lists",[])

  const addList = (title) =>{
    let newList = {
      'title': title,
      'tasks': []
    }
    setLists([...lists,newList])
  }

  const addTask = (task,indexList,image) =>{

    let newTask = {
      'id': uuidv4(),
      'title': task.title,
      'description': task.description,
      'deadline': task.deadline, 
      'estimatedtime': task.estimatedtime ,
      'priority': task.priority,
      'image': image || '',
      'label': task.labels,
      'colorindicator': task.indicator,
      'status': task.status
    }

    let listsClone = [...lists]

    console.log(listsClone)
    console.log(indexList)
    let item = {...listsClone[indexList]}

    console.log(item)

    item.tasks = [...item.tasks,newTask]

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
              console.log(index)
              return(
                <List  list={list} index={index} addTask={addTask}/>
              )
            })}
            <NewList onAddList={addList}/>
          </div>
      </div>
    </div>
  );
}

export default App;
