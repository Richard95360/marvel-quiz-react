import React,{useEffect,useState} from 'react'
import {GiTrophyCup} from 'react-icons/gi'
import Loader from '../Loader'
import Modal from '../Modal'
import axios from 'axios'

const  QuizOver = React.forwardRef((props,ref) => {

    const {
        levelNames,
        score,
        maxQuestions,
        quizLevel,
        percent,
        loadLevelQuestions
    } = props;

    const API_PUBLIC_KEY = process.env.REACT_APP_MARVEL_API_KEY;
  
    const hash = 'f2342a350eee19830a055936fb306d44';

    const [asked, setAsked] = useState([])

    const [openModal, setOpenModal] = useState(false);
    const [characterInfos, setCharacterInfos] = useState([]);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
       setAsked(ref.current)
       if(localStorage.getItem('marvelStorageDate')){
           const date = localStorage.getItem('marvelStorageDate')
           checkDataAge(date)
       }
       
    }, [ref])

    const checkDataAge = date => {
        
       const today = Date.now()
       const timeDifference = today  - date;

       const daysDifference = timeDifference / (1000 * 3600 * 24);

       if(daysDifference >= 15){
           localStorage.clear();
           localStorage.setItem('marvelStorageDate', Date.now());
       }
    }

    const averageGrade = maxQuestions/2

    if(score < averageGrade){
      
       setTimeout(() => loadLevelQuestions(quizLevel), 3000);
    }

    const showModal = id => {
       setOpenModal(true)

       if(localStorage.getItem(id)){

        setCharacterInfos(JSON.parse(localStorage.getItem(id)));
        setLoading(false);

       }else {

        axios.get(`https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`)
        .then(reponse => {
            setCharacterInfos(reponse.data);
            setLoading(false)
 
            localStorage.setItem(id, JSON.stringify(reponse.data));
            if(!localStorage.getItem('marvelStorageDate')){
 
                localStorage.setItem('marvelStorageDate', Date.now());
            }
 
        })
        .catch(error => {
            console.log(error);
        })

        }
    }

    const hideModal = () => {
        setOpenModal(false)
        setLoading(true)
    }

    const capitalizeFirestLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const decision = score >= averageGrade ? (
        <>
         <div className="stepsBtnContainer">
        {
            quizLevel < levelNames.length ?
            (
                <>
                     <p className="successMsg">Bravo, passez au niveau suivant!</p>
                    <button 
                        className="btnResult success"
                        onClick={() => loadLevelQuestions(quizLevel)}
                        >
                        Niveau Suivant
                    </button>
                </>
            )
            :
            (
                <>
                     <p className="successMsg">
                       <GiTrophyCup size='50px' /> Bravo, vous ??tes un expert !
                    </p>
                    <button 
                        className="btnResult gameOver"
                        onClick={() => loadLevelQuestions(0)}
                        >
                        Accueil
                    </button>
               </>
            )
        }
        </div>
        <div className="percentage">
            <div className="progressPercent">R??usite: {percent}%</div>
            <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
        </>
    ):
    (
        <>
        <div className="stepsBtnContainer">
           <p className="failureMsg">Vous avez ??chou??!</p>
         
        </div>
        <div className="percentage">
            <div className="progressPercent">R??usite: {percent}%</div>
            <div className="progressPercent">Note: {score}/{maxQuestions}</div>
        </div>
        </>
    )

    const questionAnswer = score >= averageGrade ? (
        asked.map(question => {
            return(
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                        <button 
                        className="btnInfo"
                        onClick={() =>showModal(question.heroId)}
                        >
                            Infos
                        </button>
                    </td>
                </tr>
            )
         })
    )
    :
    (
             <tr>
                <td colSpan="3">
                   <Loader
                   loadingMsg={"Pade r??ponses!"}
                   styling={{textAlign: 'center',color :'red'}}
                   />
                </td>
            </tr>
    )
     const resultInModal = !loading ?
    (
        <>
        <div className="modalHeader">
        <h2>{characterInfos.data.results[0].name}</h2>
        </div>
        <div className="modalBody">
            <div className="comicImage">
                <img 
                src={characterInfos.data.results[0].thumbnail.path+'.'+characterInfos.data.results[0].thumbnail.extension} 
                alt={characterInfos.data.results[0].name} 
                />
                {characterInfos.attributionText}
            </div>
            <div className="comicDetails">
                <h3>Description</h3>
                {
                    characterInfos.data.results[0].description ?
                    <p>{ characterInfos.data.results[0].description}</p>
                    : <p>Description indisponible</p>
                }
                <h3>Plus d'infos</h3>
                {
                    characterInfos.data.results[0].urls &&
                    characterInfos.data.results[0].urls.map((url,index) => {
                        return <a 
                        href={url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        >
                            {capitalizeFirestLetter(url.type)}
                        </a>
                    })
                }
            </div>
        </div>
        <div className="modalFooter">
            <button className="modalBtn" onClick={hideModal}>Fermer</button>
        </div>
        </>

     )
     :
     (
        <>
        <div className="modalHeader">
        <h2>R??ponse de Marvel...</h2>
        </div>
        <div className="modalBody">
            <Loader/>
        </div>
       
        </>
     )
   
    return (
        <>
        {decision}
        <hr />
        <p>Les r??ponses aux questions pos??es:</p>
        <div className="answerContainer">
            <table className="answers">
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>R??ponses</th>
                        <th>Infos</th>
                    </tr>
                </thead>
                <tbody>
                   {questionAnswer}
                </tbody>
            </table>
        </div>
        <Modal  showModal={openModal} hideModal={hideModal}>
               
                    {resultInModal}
        </Modal>
        </>
    )
})



export default React.memo(QuizOver)
