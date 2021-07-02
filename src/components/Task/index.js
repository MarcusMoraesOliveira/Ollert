import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStopwatch, faClock, faPauseCircle, faCheck, faTools, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Menu, MenuItem, Button   } from '@material-ui/core';



const Task = ({ task, index, EditTask}) => {
  

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const statusToicon =   {'NS':faPauseCircle, 'D': faCheck, 'IP': faTools, 'C': faTimes}
  const statusFullName =   {'NS':'Not Started', 'D': 'Done', 'IP': 'in Progress', 'C': 'Closed'}

  return(
    <div className="task" onClick={ () => { EditTask(index) }}>
      <div style={{display: 'flex', flexDirection: 'column', width: '80%'}}>
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20%'}}>
        <FontAwesomeIcon icon={statusToicon[task.status]} style={{ fontSize: '1em', color: 'black'}} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        </FontAwesomeIcon>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {Object.keys(statusToicon).map((key) => {
            return <MenuItem  onClick={handleClose}> <FontAwesomeIcon icon={statusToicon[key]} style={{ fontSize: '1em', color: 'black'}} /> <span style={{marginLeft: '10px'}}> {statusFullName[key]} </span> </MenuItem>
          })}
        </Menu>
      </div>
    </div>
  )
}

export default Task;