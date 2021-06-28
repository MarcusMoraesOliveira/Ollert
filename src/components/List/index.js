import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-modal';
import { useState } from 'react'
import TaskInfo from '../TaskInfo';

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
const List = ({list}) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return(
    <div>
      <div className="list">
        <span style={{ textAlign: 'center'}} className="listTitle"> <b> {list.title} </b> </span>
        <div className="footer">
          <FontAwesomeIcon icon={faPlus} className="icon" onClick={ () => { setIsOpen(true)}}/>
          <span> Add a Task </span>
        </div>
      </div>
      <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => {setIsOpen(false)}}
      style={ModalStyles}
      >
       <TaskInfo />
      </Modal>
    </div>
  )
}

export default List;