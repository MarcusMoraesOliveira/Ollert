import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../../Hooks/useLocalStorage'




const LabelChooser = ({ SaveLabels }) => {
  const [labels,setLabels] = useLocalStorage("labels",[])
  const [name, setName] = useState("");
  const [choosed, setChoosed] = useState([])


  const handleChange = (ev) =>{
    setName(ev.target.value)
  }

  const createLabel = () => {
    let newLabel = {
      "id" : uuidv4(),
      "name" : name
    }
    setLabels([...labels,newLabel])
  }

  const deleteLabel = (idx) => {
    let array = [...labels]
    array.splice(idx,1)
    setLabels(array)
    if(choosed.includes(idx)){
      array = [...choosed]
      let index = array.indexOf(idx)
      array.splice(index,1)
      setChoosed(array)
    }
  }

  const changeChoosedValue = (idx) =>{
    if(choosed.includes(idx)){
      let array = [...choosed]
      let index = array.indexOf(idx)
      array.splice(index,1)
      setChoosed(array)
    }else{
      setChoosed([...choosed,idx])
    }
  }

  const processSelectedLabels = (callback) =>{
      let selectedLabels = []
      choosed.forEach(element => {
        selectedLabels.push(labels[element])
      });
      callback(selectedLabels)

  }

  return(
    <div className="labelChoose">
      {labels.map((label,index) =>{
        return(
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '1em', justifyContent: 'space-evenly'}}>
          <div className={ choosed.includes(index)? "label choosed": "label"}
          key={index} 
          onClick={ () => {changeChoosedValue(index)} }
          >
            <span> { label.name } </span>
          </div>
            <FontAwesomeIcon icon={faTimes} className="deleteLabel" onClick={() => deleteLabel(index)}/>
        </div>
        )
      })}
      <div className="newLabel">
        <input type="text" name="name" value={name} onChange={handleChange} />
        <button className="createLabels" onClick={createLabel}> Create Label </button>
        <button className="saveLabels" onClick={() => {processSelectedLabels(SaveLabels)}}> Save Labels</button>
      </div>
    </div>
  )
}

export default LabelChooser;