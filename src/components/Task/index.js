import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDove, faStopwatch, faClock } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Modal from 'react-modal'
import LabelChooser from '../LabelChooser'


const Task = ({ task, index }) => {
  
  return(
    <div className="task">
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <span style={{ fontSize: '1em'}}>{task.title}</span>
        <div>
          {task.deadline && 
          <div>
          <FontAwesomeIcon icon={faStopwatch} style={{ fontSize: '1em', color: 'black'}} />
          <span style={{ fontSize: '1em'}}>{task.deadline}</span>
          </div>
          }
          {task.estimatedtime && 
          <div>
          <FontAwesomeIcon icon={faClock} style={{ fontSize: '1em', color: 'black'}} />
          <span>{task.estimatedtime}</span>
            </div>}
        </div>  
        <div className="priority">
          <span>{task.priority}</span>
        </div>
        <div className="labelWrapper">
          {console.log(task.label)}
          {task.label.map((label,index) =>{
            return (
            <div className="labels"
            key={index} 
            >
              <span> { label.name } </span>
            </div>
            )
          })}
        </div>
      </div>
      <span>xaxa</span>
    </div>
  )
}

export default Task;