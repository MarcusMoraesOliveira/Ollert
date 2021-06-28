import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Modal from 'react-modal'
import useLocalStorage from '../../Hooks/useLocalStorage'


const TaskInfo = ({task, image}) => {
  const [values, setValues] = useState({
    'title' : "insert a title here" || task?.title,
    'description' : "insert a detailed description here" || task?.description,
    'Deadline' : "" || task?.deadLine,
    'EstimatedTime' : "" || task?.time,
    'priority' : undefined || task?.priority,
    'image' : undefined || image,
    'labels' : {} || task?.labels,
    'colorIndicator': undefined ||task?.indicator
  })

  const ModalStyles = {
    content: {
      width: '8vw',
      height: '32vh',
      top: '50%',
      left: '60%',
      padding: '1em'
    },
  }


  const [labels,setLabels] = useLocalStorage("labels",[])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState([])

  const handleChange = (ev) =>{
    setValues({
      ...values,
      [ev.target.name]: ev.target.value
    })
  }

  const priorityValus = ["Low","Medium","Urgent"]

  return(
    <div className="taskWrapper">
      <div className= 'title column' style={{ marginTop: '2em'}}>
        <label> Title </label>
        <input name="title" value={values.title} onChange={handleChange}></input>
      </div>
      <div className= 'description column' style={{ marginTop: '2em'}} >
        <label> description </label>
        <textarea name="description" value={values.description} onChange={handleChange}></textarea>
      </div>
      <div className= 'Deadline column' style={{ marginTop: '2em'}}>
        <label> Deadline </label>
        <input  type="date" name="Deadline" value={values.Deadline} onChange={handleChange}></input>
      </div>
      <div className= 'EstimatedTime column' style={{ marginTop: '2em'}}>
        <label> Estimated Time </label>
        <input  type="date" name="EstimatedTime" value={values.EstimatedTime} onChange={handleChange}></input>
      </div>
      <div className= 'Priority column' style={{ marginTop: '2em'}}>
        <label> Priority </label>
        <select  name="priority" value={values.priority} onChange={handleChange}>
            <option value=""></option>
            { priorityValus.map((value,index) =>{
              return <option key={index} value={value}>{value}</option>
            })}
        </select>
      </div>
      <div className= 'Labels column' style={{ marginTop: '2em'}}>
        <label> Labels </label>
        <div>
          <FontAwesomeIcon icon={faPlus}  onClick={ () => { setIsOpen(true)}}/>
          <span> Add a Label </span>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => {setIsOpen(false)}}
        style={ModalStyles}
        >
          
        </Modal>
    </div>
  )
}

export default TaskInfo;