import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDove, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Modal from 'react-modal'
import LabelChooser from '../LabelChooser'


const TaskInfo = ({task, image , addTask , index}) => {
  const [values, setValues] = useState({
    'title' : "insert a title here" || task?.title,
    'description' : "insert a detailed description here" || task?.description,
    'Deadline' : "" || task?.deadLine,
    'EstimatedTime' : "" || task?.time,
    'priority' : undefined || task?.priority,
    'image' : undefined || image,
    'labels' : [] || task?.labels,
    'colorIndicator': undefined ||task?.indicator,
    'status' : "" || task?.status
  })

  const ModalStyles = {
    content: {
      width: '12vw',
      height: '32vh',
      top: '50%',
      left: '60%',
      padding: '1em'
    },
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState([])

  const handleChange = (ev) =>{
    setValues({
      ...values,
      [ev.target.name]: ev.target.value
    })
  }

  const addLabels = (selectedLabels) =>{
    console.log(selectedLabels)
    setValues({
      ...values,

      'labels': selectedLabels
    })
    closeModal()
  }

  const closeModal = () =>{
    setIsOpen(false)
  }

  const priorityValus = ["Low","Medium","Urgent"]
  const statusValues = [{'sigla': 'NS', 'name': 'Not started'}, {'sigla': 'IP', 'name': 'In Progress'},
                        {'sigla': 'D', 'name': 'Done'}, {'sigla': 'C', 'name': 'Closed'}]

  return(
    <div className="taskWrapper">
      {console.log( index )}
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
        {values.labels.map((label,index) =>{
          return (
            <div key={index}>
              <span> {label.name} </span>
            </div>
          )
        })}
        <div>
          <FontAwesomeIcon icon={faPlus}  onClick={ () => { setIsOpen(true)}}/>
          <span> Add a Label </span>
        </div>
      </div>

      <div className= 'EstimatedTime column' style={{ marginTop: '2em'}}>
        <label> Color Indicator </label>
        <input  type="date" name="EstimatedTime" value={values.EstimatedTime} onChange={handleChange}></input>
      </div>

      <div className= 'status column' style={{ marginTop: '2em'}}>
        <label>  Status </label>
        <select  name="status" value={values.status} onChange={handleChange}>
            <option value=""></option>
            { statusValues.map((value,index) =>{
              return <option key={index} value={value.sigla}>{value.name}</option>
            })}
        </select>
      </div>

        <div style={{ display: 'flex', justifyContent: 'center',  marginTop: '2em'}}>
          <button onClick={ () => addTask(values,index,undefined)}> Save Task </button>
        </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalStyles}
        >
          <LabelChooser  SaveLabels={addLabels}/>
        </Modal>
    </div>
  )
}

export default TaskInfo;