import React,{useState, useContext,useEffect} from 'react'
import Logout from '../Logout'
import Quiz from '../Quiz'
import {FirebaseContext }from '../Firebase'
import Loader from '../Loader'

const Welcome = (props) => {

    const [userSession, setUserSession] = useState(null)

    const firebase = useContext(FirebaseContext);

    const [userData, setUserData] = useState({})

    useEffect(() => {

      let listener =  firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push('/')
        })

        if(!!userSession){

            firebase.user(userSession.uid)
            .get()
            .then(doc => {
               if(doc && doc.exists){
                 const myData =   doc.data();
                 setUserData(myData)
               }
            })
            .catch(error => {
                console.log(error);
            })
        }


        return () => {
        listener()
        };

    },[userSession]);

     
      return  userSession === null ? (
       
          
              <Loader
                   loadingMsg={"Authentication..."}
                   styling={{textAlign: 'center',color :'#FFFFFF'}}
                   />
      
    ) : (
        <div className="quiz-bg">
            <div className="container">
           <Logout/>
           <Quiz userData={userData}/>
            </div>
        </div>

    )
  
}

export default Welcome
