import React,{useState, useEffect} from "react";
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";

const SelectBar = ({index, setFeaturesList, featuresList, taste, is_edit}) => {
    const [cur_position, setCur_Position] = useState(0);
    const [score, setScore] = useState(0);
    featuresList[index] = score;
    setFeaturesList(featuresList)
    
    console.log("taste:",taste)
    console.log("cur_position",cur_position);

    
    useEffect(()=>{
      setCur_Position(taste*25-25)
    },[taste])

/*
    const handleScore = (score) => {
        featuresList[index] = score;
        setFeaturesList(featuresList)
    };
*/
    return (
      <React.Fragment>
      { is_edit ? (
        <>
            <div style={{width: "200px", marginTop: "35px"}} >
            <ProgressBar percent={cur_position} filledBackground="#FFC44F">
              {featuresList.map((p,index) => (
                <Step key={index}>
                {({ accomplished, position, index ,percent, children}) => ( //accomplished는 도달 여부 T/F, position은 현재 %(예를 들어 2번째를 클릭하면 20%)
                  <div 
                    style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: `${accomplished ? "#ffC44F" : "#D3D3D3"}`}}
                    onClick={() => {
                      setCur_Position(position);
                      setScore(5-((100-position)/25)); //점수
                      //handleScore(score);
                    }}
                    // className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                  />
                )}
              </Step>
              ))}   
            </ProgressBar>
            </div>
            
        </>
  
        ):(
        <>
          <div style={{width: "200px", marginTop: "35px"}} >
          <ProgressBar percent={cur_position} filledBackground="#FFC44F">
            {featuresList.map((p,index) => (
              <Step key={index}>
              {({ accomplished, position, index ,percent, children}) => ( //accomplished는 도달 여부 T/F, position은 현재 %(예를 들어 2번째를 클릭하면 20%)
                <div 
                  style={{width: "20px", height: "20px", borderRadius: "50%", backgroundColor: `${accomplished ? "#ffC44F" : "#D3D3D3"}`}}
                  onClick={() => {
                    setCur_Position(position);
                    setScore(5-((100-position)/25)); //점수
                    //handleScore(score);
                  }}
                  // className={`indexedStep ${accomplished ? "accomplished" : ""}`}
                />
              )}
            </Step>
            ))}   
          </ProgressBar>
          </div>
        </>
        )}
      </React.Fragment>


    );

};

export default SelectBar;
//https://pierreericgarcia.github.io/react-step-progress-bar/docs/custom-step-guide
