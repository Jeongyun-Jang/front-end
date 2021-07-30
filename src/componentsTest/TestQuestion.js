import React from "react";
import styled from "styled-components";

const TestQuestion = ({ question }) => {
    return(
        <React.Fragment>
            <QuestionWrap>
                <p>{question.questionNum}</p>
                <span>{question.question}</span>
            </QuestionWrap>
        </React.Fragment>
    )
}

export default TestQuestion;

const QuestionWrap = styled.div`
    width: 192px;
    margin: 0 0 0 26px;
    & > p {
        font-size: 35px;
        color: #FFC44F;
        margin: 0 0 20px 0;
    }
    & > span {
        font-size: 25px;
        font-weight: normal;
    }
`;