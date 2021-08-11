import React from "react";
import styled from "styled-components/macro";
import {history} from "../redux/configureStore";
import moment from 'moment';
import 'moment/locale/ko';
import {TasteGraph,StarRate} from "../componentsBeer/BeerIndex";
import Header from "../Header";

const MyReview = (props) =>{
    const item = props.location.state;
    const date = moment(item?.date);

    // 별점, 그래프, 리뷰 정보
    return(
        <React.Fragment>
            <Header/>
            <Container>
                <Div style={{margin: "70px 20px"}}>

                <Title><span>내가 쓴 게시물</span></Title>
                <WritedBeerInfo >
                    <BeerImage>
                        <img src={item?.beerId?.image}></img>
                    </BeerImage>
                    <BeerTextWrap>
                        <span>{item?.review}</span>
                    </BeerTextWrap>
                </WritedBeerInfo>
                <Text><span>별점</span></Text>                      
                <div style={{textAlign: "center", margin: "-10px 0 10px 0"}}>
                    <StarRate init_star={item.rate}/>
                </div>
                <Text><span>그래프</span></Text>                      
                <Graph>
                    <TasteGraph beers={item?.myFeatures}/>
                </Graph>
                <div style={{textAlign: "center"}}>
                </div>
                </Div>

            </Container>
        </React.Fragment>
    )
}
export default React.memo(MyReview, TasteGraph);

const Container = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
    & > span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: auto;
        text-align:left;
    }
`;

const Title = styled.div`

    & > span{
        font-weight: 700;
        font-size: 14px;
        line-height: 20.27px;

    } 
    
`

const Text = styled.div`
    margin: 0;
    text-align: center;
    & > span{
        font-size: 14px;
        font-weight: 700;
        line-height: 20.27px;
    }

`
const WritedBeerInfo = styled.div`
    display: flex;
`;

const BeerImage = styled.div`
    margin:  10px 5px;
    width: 100px;
    height: 100px;
    border-radius: 10px;
    background-color: #FFFFFF;
    border: 1px solid #c4c4c4;
    & > img{
        width: 100px;
        height: 100px;
    }
`;

const BeerTextWrap = styled.div`
    margin: 10px 5px;
    width: 208px;
    height: 100px;
    
    border-radius: 10px;
    border: 1px solid #c4c4c4;
    & > span{
        float: left;
        margin: 10px;
        font-size: 12px;
        font-weight: 300;
        line-height: 17.38px;
    }
`;

const Div = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;  
    margin: 14px auto;
    & > span{
        float: left;
        font-weight: 700;
    }
`

const Graph = styled.div`
    margin: 14px auto;
    display: flex;
    width: 313px;
    height: 313px;
    border: 2px solid #FFC44F;
    border-radius: 10px;
`;

