import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faClock, faPauseCircle, faCheck, faTools, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import { Menu, MenuItem, Button   } from '@material-ui/core';
import useLocalStorage from '../../Hooks/useLocalStorage';


const Task = ({ task, index, EditTask, updateTask, indexList, deleteTask}) => {
  
  const [images, setImages] = useLocalStorage("images",[])
  const [anchorEl, setAnchorEl] = useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const preProcessTask = (callback,key) => {
    task['status'] = key
    callback(task,indexList,undefined)
  };

  const statusToicon =   {'NS':faPauseCircle, 'D': faCheck, 'IP': faTools, 'C': faTimes}
  const statusFullName =   {'NS':'Not Started', 'D': 'Done', 'IP': 'in Progress', 'C': 'Closed'}

  return(
    <div className="task" >
      <div style={{display: 'flex'}} >
      {task.image && <img src={`data:image/png;base64,${task.image}`} style={{marginBottom: '0.4em'}}  className="image"/>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: '1em', color: 'black', marginRight: '0.3em'}} onClick={ () => { EditTask(index) }} />
          <FontAwesomeIcon icon={faTimes} style={{ fontSize: '1em', color: 'red'}}  onClick={ () => {deleteTask(index,indexList)}}/>
        </div>
      </div>
      <div style={{display: 'flex'}}>
      <div style={{display: 'flex', flexDirection: 'column', width: '80%'}} >
        <span style={{ fontSize: '1em'}}>{task.title}</span>
        <div style={{ display: 'flex'}}>
          {task.deadline && 
          <div>
          <FontAwesomeIcon icon={faStopwatch} style={{ fontSize: '0.5em', color: 'black'}} />
          <span style={{ fontSize: '0.5em', marginLeft: '0.5em'}}>{task.deadline}</span>
          </div>
          }
          {task.estimatedtime && 
          <div style={{ marginLeft: '0.5em'}}>
          <FontAwesomeIcon icon={faClock} style={{ fontSize: '0.5em', color: 'black'}} />
          <span style={{ fontSize: '0.5em', marginLeft: '0.5em'}} >{task.estimatedtime}</span>
            </div>}
        </div>  
        <div className="priority">
          <span>{task.priority}</span>
        </div>
        <div className="labelWrapper">
          
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
      
      <div style={{ display: 'flex', width: '20%', flexDirection: 'column'}}>
        <div style={{ display: 'flex', justifyContent: 'flex-end'  }}>
              <div className='circle' style={{ backgroundColor: task.color }}></div>
        </div>
        {task.status &&
        <div>
          <FontAwesomeIcon  className='status_icon' icon={statusToicon[task.status]} style={{ fontSize: '1em', color: 'black'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          </FontAwesomeIcon>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {Object.keys(statusToicon).map((key) => {
              return <MenuItem  onClick={() => preProcessTask(updateTask,key)}> <FontAwesomeIcon icon={statusToicon[key]} style={{ fontSize: '1em', color: 'black'}} /> <span style={{marginLeft: '10px'}}> {statusFullName[key]} </span> </MenuItem>
            })}
          </Menu>
        </div>
        }
      </div>
      </div>

    </div>
  )
}

export default Task;