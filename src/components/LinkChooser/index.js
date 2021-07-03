import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../../Hooks/useLocalStorage'




const LinkChosser = ({ SaveLinks }) => {
  const [lists,setLists] = useLocalStorage("lists",[])
  const [choosed, setChoosed] = useState([])
  



  const changeChoosedValue = (idx) =>{
    console.log(idx)
    if(choosed.includes(idx)){
      let array = [...choosed]
      let index = array.indexOf(idx)
      array.splice(index,1)
      setChoosed(array)
    }else{
      setChoosed([...choosed,idx])
    }
  }

  const processSelectedLinks = (callback) =>{
    let selectedLinks = []
    choosed.forEach(element => {
      let delimiterindex = element.indexOf(" ")
      selectedLinks.push(lists[parseInt(element.slice(0,delimiterindex+1))].tasks[parseInt(element.slice(delimiterindex+1,element.length))].id)
      console.log(selectedLinks)
    });
    callback(selectedLinks)

}

  return(
    <div className="linkChoose">
      {lists.map((list,indexList) =>{
        return(
        list.tasks.map((task,indexTask) =>{
          console.log(task)
          return(
          <div className={ choosed.includes(indexList+" "+indexTask)? "linkedTask choosed": "linkedTask"}
          key={indexTask} 
          onClick={ () => {changeChoosedValue(indexList+" "+indexTask)} }
          style = {{ marginTop: '0.8em'}}
          >
            <span> { task.title } </span>
          </div>
          )
        }) 
        )
      })
      }
      <div className="saveLinks">
        <button className="saveLabels" onClick={() => {processSelectedLinks(SaveLinks)}}> Save Links</button>
      </div>
    </div>
  )
}

export default LinkChosser;