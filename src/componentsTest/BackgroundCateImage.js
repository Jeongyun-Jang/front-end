import React from "react";
import styled from "styled-components";

const BackgroundCateImage = (props) => {
    return(
        <React.Fragment>
            <BackgroundImage>
                <Wrap>
                    <TextWrap> 
                        <p>당신을 위한 오늘의 맥주는,</p>
                        <h1>‘IPA’</h1>
                    </TextWrap>
                    <ShareButton></ShareButton>
                </Wrap>
            </BackgroundImage>
        </React.Fragment>
    )
}

export default BackgroundCateImage;

const BackgroundImage = styled.div`
    width: 100%;
    height: 270px;
    background-color: gray;
    text-aligin: center;
    display: flex;
    justify-content: center;
`;

const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 360px;
`;

const TextWrap = styled.div`
    display: inline-block;
    width: 125px;
    margin: 68px 0 0 16px;
    & > p {
        margin: 0;
        font-size: 20px;
        color: #FFFFFF;
    }
    & > h1 {
        margin-top: 9px;
        font-size: 35px;
        color: #FFFFFF;
    }
`;

const ShareButton = styled.div`
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #FFFFFF;
    margin: 63px 12px 0 0;
    float: right;
`;