import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import { useState } from 'react'
import TaskInfo from '../TaskInfo';
import Task from '../Task';

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '1em',
    backgroundColor: '#f4f5f7'
  },
};

const priorityToColor = [{
 "low": "blue"
},{
  "medium": "yellow"
}
,{
  "Urgent": "Red"
}]




Modal.setAppElement('#root');
const List = ({ list, indexList, addTask, updateTask, deleteTask, getTask, deleteList}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentTask,setCurrentTask] = useState({})

  const EditTask = (index) =>{
    setCurrentTask(list.tasks[index])
    setIsOpen(true)
  }

  return(
    <div>
      <div className="list">
        <div style={{ display: 'flex', justifyContent: 'center'}}>
          <div style={{ display: 'flex', width: '80%', justifyContent: 'center', paddingLeft: '1.8em'}}>
            <span style={{ textAlign: 'center'}} className="listTitle"> <b> {list.title} </b> </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '20%'}}>
            <FontAwesomeIcon icon={faTimes} className="icon" style={{ fontSize: '1em', color: 'red'}} onClick={() => deleteList(indexList)}/>
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}} className="overflow">
        {list.tasks.map((task,index) =>{
          return  <Task task={task} index={index} EditTask={EditTask} 
          key={index} updateTask={updateTask} indexList={indexList}
          deleteTask={deleteTask}></Task>
          })}
         </div>
        <div className="footer">
          <FontAwesomeIcon icon={faPlus} className="icon" onClick={ () => { setIsOpen(true)}}/>
          <span> Add a Task </span>
        </div>
      </div>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        setIsOpen(false) 
        setCurrentTask({})
      }}
      style={ModalStyles}
      >
       <TaskInfo addTask={addTask} updateTask={updateTask} index={indexList} task={currentTask} getTask={getTask}/>
      </Modal>
    </div>
  )
}

export default List;