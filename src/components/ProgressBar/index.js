import React from 'react'

const ProgressBar = ({idQuestion,maxQuestions}) => {

    const getWidth = (totalQuestion, questionId)=> {
      return (100/ totalQuestion) * questionId
    }

    const actualQuestion = idQuestion +1;

   const progressPercent = getWidth(maxQuestions,actualQuestion);

   console.log(progressPercent);

    return (
        <>
        <div className="percentage">
           <div className="progressPercent">{`Question: ${idQuestion +1}/${maxQuestions}`}</div>
           <div className="progressPercent">{`Progression:${progressPercent}%`}</div>
        </div>
        <div className="progressBar">
            <div className="progressBarChange" style={{width:`${progressPercent}%`}}> </div>
        </div>
        </>
    )
}

export default React.memo(ProgressBar)
