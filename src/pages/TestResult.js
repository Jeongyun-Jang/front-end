import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { useSelector } from "react-redux";

import BackgroundCateImage from "../componentsTest/BackgroundCateImage";
import { RecommendBeer, ResultInfo, TestHeader } from "../componentsTest/TestIndex";

const TestResult = (props) => {
    const category = useSelector((state) => state.beer.beerToday.category);
    const beerRecommends = useSelector((state) => state.beer.beerToday.recommendations);
    return (
        <React.Fragment>
            <TestHeader/>
                <Grid>  
                    <BackgroundCateImage category={category}/>
                    <Wrap>
                        <ResultInfo category={category}/>
                        <RecommendBeerWrap>
                            {beerRecommends?.map((item, idx) => (
                                <RecommendBeer item={item}></RecommendBeer>
                            ))}
                        </RecommendBeerWrap>
                    </Wrap>
                    <ReButton
                        onClick={() => {
                            history.push("/test/");
                        }}
                    >다시 하기
                        <img src="https://image.flaticon.com/icons/png/512/724/724863.png"></img>
                    </ReButton>
                </Grid>
            <Testdiv></Testdiv>
        </React.Fragment>
    )
}

export default TestResult;

const Grid = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const RecommendBeerWrap = styled.div`
    margin: 14px 0 0 24px;
    width: 312px;
    display: flex;
    justify-content: space-between;
`;

const Wrap = styled.div`
    width: 360px;
    margin: 0 auto;
`;

const ReButton = styled.div`
    text-align: center;
    color: #FFC44F;
    font-size: 14px;
    font-weight: bold;
    line-height: 45px;
    width: 308px;
    height: 45px;
    margin: 0 auto;
    margin-top: 30px;
    background-color: transparent;
    border: 1px solid #FFC44F;
    border-radius: 22.5px;
    & > img{
        margin-left: 4px;
        width: 11px;
        height: 11px;
    }
`;

const Testdiv = styled.div`
    width: 100%;
    height: 1000px;
`;
