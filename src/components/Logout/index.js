import React,{useState,useEffect,useContext} from 'react'
import {FirebaseContext }from '../Firebase'
import ReactTooltip from 'react-tooltip';

const Logout = () => {

   const [checked, setChecked] = useState(false)
   const firebase = useContext(FirebaseContext)

    useEffect(() => {
        if(checked){
          
            firebase.sigoutUser()
        }
        
    }, [checked,firebase])

    const handleChange = e => {
        setChecked(e.target.checked)
       
    }

    return (
        <div className="logoutContainer">
           <label className="switch">
               <input
               onChange={handleChange}
                type="checkbox"
                checked={checked}
                />
               <span className="slider round" data-tip="Déconnexion"></span>
           </label>
           <ReactTooltip 
           place="left"
           effect="solid"
           />
        </div>
    )
}

export default Logout
