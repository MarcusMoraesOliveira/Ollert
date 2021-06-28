import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import './styles.css'

const NewList = ({onAddList}) => {
  const [clicked,setclicked] = useState(false)
		const [title,setTitle] = useState("")

		const  handleChange = (ev) => {
			setTitle(ev.target.value)
	}

  return(
    <div>
    {!clicked ? 
    <div className="newList" onClick={() => setclicked(true)}>
      <FontAwesomeIcon icon={faPlus} className="icon"/>
      <span> Add a list </span>
    </div> 
   : <div className="listInput">
						
						<input type="text" name="title" value={title} onChange={handleChange}/>
						<div className="flexEvenly marginTop" >
							<button className="createListButton" onClick={() => onAddList(title)}>Create list</button>
							<FontAwesomeIcon icon={faTimes} className="deleteIcon" onClick={() => setclicked(false)}/>
						</div>
     </div>
     
					}
   
   </div>  
  )
}

export default NewList;