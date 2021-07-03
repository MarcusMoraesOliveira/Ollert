import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Modal from 'react-modal'
import LabelChooser from '../LabelChooser'
import LinkChosser from '../LinkChooser'
import ColorChosser from '../colorChosser'

const TaskInfo = ({task, addTask , index, updateTask, getTask}) => {
  const [values, setValues] = useState({
    'id' : task?.id || "",
    'title' : task?.title  || "insert a title here",
    'description' : task?.description || "insert a detailed description here",
    'deadline' : task?.deadLine || "",
    'estimatedtime' : task?.estimatedtime || "",
    'priority' : task?.priority || undefined,
    'image' : task?.image || "",
    'label' : task?.label || [],
    'color': task?.color || undefined ,
    'status' : task?.status || "",
    'linked' : task?.linked || []
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

  const [modalComponent, setModalComponent] = useState('')

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
      console.log(reader.result)
      const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
      setValues({
        ...values,
        'image': base64String
      })
      console.log(values)
    };
  };


  const handleChange = (ev) =>{
    console.log(ev.target.name)
    console.log(ev.target.value)
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

  const addcolor = (selectedColor) =>{
    setValues({
      ...values,

      'color': selectedColor
    })
    closeModal()
  }

  const addLinks = (selectedLinks) =>{
    setValues({
      ...values,

      'linked': selectedLinks
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
      {console.log(values)}
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
        <input  type="date" name="deadline" value={values.deadline} onChange={handleChange}></input>
      </div>
      <div className= 'EstimatedTime column' style={{ marginTop: '2em'}}>
        <label> Estimated Time </label>
        <input  type="text" name="estimatedtime" value={values.estimatedtime} onChange={handleChange}></input>
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
          <FontAwesomeIcon icon={faPlus}  onClick={ () => { 
            setModalComponent('labels')
            setIsOpen(true)}}/>
          <span> Add a Label </span>
        </div>
      </div>

      <div className= 'linked column' style={{ marginTop: '2em'}}>
        <label> Linked Tasks </label>
        <div>
        <div className="overflow" style={{ display: 'flex', flexDirection: 'column', maxHeight: '10vh'}}>
        {values.linked.map((link,index) =>{
          return (
            <div key={index} style={{ backgroundColor: 'black', maxWidth: '10vw', marginBottom: '1em'}}>
              <span style={{ color: 'white'}}> {getTask(link)} </span>
            </div>
          )
        })}
        </div>
          <FontAwesomeIcon icon={faPlus}  onClick={ () => { 
            setModalComponent('linked')
            setIsOpen(true)
            }}/>
          <span> Link a Task </span>
        </div>
      </div>

      <div className= 'color column' style={{ marginTop: '2em'}}>
        <label> Color Indicator </label>
        <div>
        <FontAwesomeIcon icon={faPlus}  onClick={ () => { 
            setModalComponent('color')
            setIsOpen(true)
            }}/>
          <span> Set color </span>
        </div>
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
          {modalComponent == 'labels' && <LabelChooser  SaveLabels={addLabels}/>}
          {modalComponent == 'linked' && <LinkChosser SaveLinks={addLinks}/>}
          {modalComponent == 'color'  && <ColorChosser SaveColor={addcolor} />} 
        </Modal>
    </div>
  )
}

export default TaskInfo;