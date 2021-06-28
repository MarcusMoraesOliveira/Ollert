import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const LabelChooser = ({labels}) => {
  const [name, setName] = useState("");

  const handleChange = (ev) =>{
    setName(ev.target.value)
  }

  return(
    <div class="newLabel">
      {labels.map((label,index) =>{
        <span> {label} </span>
      })}
            
      <input type="text" name="name" value={name} onChange={handleChange} />
      <button className="createLabels"> Create Label </button>
    </div>
  )
}

export default LabelChooser;