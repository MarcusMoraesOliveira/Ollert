
import './App.css';
import NewList from './components/NewList';
import List from './components/List';
import { useState } from 'react'

function App() {
  const [lists, setLists] = useState([])

  const addList = (title) =>{
    let newList = {
      'title': title,
      'Tasks': []
    }
    setLists([...lists,newList])
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
              console.log(list)
              return(
                <List  list={list}/>
              )
            })}
            <NewList onAddList={addList}/>
          </div>
      </div>
    </div>
  );
}

export default App;
