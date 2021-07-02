import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Modal from 'react-modal'
import LabelChooser from '../LabelChooser'


const TaskInfo = ({task, addTask , index, updateTask}) => {
  const [values, setValues] = useState({
    'id' : task?.id || "",
    'title' : task?.title  || "insert a title here",
    'description' : task?.description || "insert a detailed description here",
    'Deadline' : task?.deadLine || "",
    'EstimatedTime' : task?.time || "",
    'priority' : task?.priority || undefined,
    'image' : task?.image || "",
    'label' : task?.label || [],
    'colorIndicator': task?.indicator || undefined ,
    'status' : task?.status || ""
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

  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = e => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      console.log("ta aqui entro")
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      setValues({
        ...values,
        'image': base64String
      })
      console.log(values)
    };
  };


  const handleChange = (ev) =>{
    setValues({
      ...values,
      [ev.target.name]: ev.target.value
    })
  }

  const addLabels = (selectedLabels) =>{
    setValues({
      ...values,

      'label': selectedLabels
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
        {values.label.map((label,index) =>{
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

      <div className= 'status column' style={{ marginTop: '2em'}}>
        <label>  Image </label>
        <input type="file"  onChange={handleFileInputChange}/>
      </div>

        <div style={{ display: 'flex', justifyContent: 'center',  marginTop: '2em'}}>
          {Object.keys(task).length === 0 ?  
          <button onClick={ () => addTask(values,index,undefined)}> Save Task </button> :
          <button onClick={ () => updateTask(values,index,undefined)}> Save Task </button>
          }
          
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