import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'





const ColorChosser = ({ SaveColor }) => {
  const [choosed, setChoosed] = useState(-1)
  

  const colors = ['blue','black', 'orange', 'yellow']


  const changeChoosedValue = (idx) =>{
    console.log(idx)
    if(choosed == idx){
      setChoosed(-1)
    }else{
      setChoosed(idx)
    }
  }

  const processSelectedLinks = (callback) =>{
  
    callback(colors[choosed])

}

  return(
    <div className="colorChoose">
      {colors.map((color,index) =>{
        return(
          <div>
            <div className={ choosed == index? "colorDiv choosed": "colorDiv"}
          key={index} 
          onClick={ () => {changeChoosedValue(index)} }
          style = {{ marginTop: '0.8em', backgroundColor: color}}
          >
          </div>
          </div>
        )
      })}

      <div className="saveColor">
        <button className="saveLabels" onClick={() => {processSelectedLinks(SaveColor)}}> Save Links</button>
      </div>

    </div>
  )
}

export default ColorChosser;