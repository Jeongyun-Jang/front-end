import React,{useState} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { Link } from "react-router-dom";
import HeartButton from "./HeartButton";
import TasteGraph from "./TasteGraph";
//import axios from "Axios";
const BeerDetail = () =>{
    const [toggle, setToggle] = useState(false);

    const beer_detail = 
        {
            name: "곰표 밀맥주",
            eng_name: "Gompyo Wheat beer",
            hash_tag: "달달",
            introduce: "",
            //graph: "",
            store: ["GS25 편의점", "현대백화점 식품관"],
            other_store: ["CU 편의점 여의도역 R점"],
        }
    
    
    return(
        <React.Fragment>
            <Container>
                <Img>
                    {/*<img src="/"/>*/}
                </Img>

                <Grid>
                    <Horizion>
                    <span style={{ fontWeight: "700", fontSize: "20px", lineHeight: "29px"}}>{beer_detail.name}</span>
                    <div style={{ width: "38px", height: "38px", borderRadius: "50%" ,display: "flex", border: "1px solid #212121"}}>
                        <HeartButton 
                            _onClick={(e) => {
                                toggle ? setToggle(false) : setToggle(true);
                                e.preventDefault();
                                e.stopPropagation();              
                            }}
                            is_like={toggle}                    
                        />
                    </div>
                    </Horizion>
                    <span>{beer_detail.eng_name}</span>
                    <TasteTag>#{beer_detail.hash_tag}</TasteTag>

                    
                </Grid>
                <hr/>

                <Grid>
                    <span style={{ fontWeight: "700"}}>맥주소개</span>
                    <span style={{ fontWeight: "500", fontSize: "14px", lineHeight: "20px",padding: "14px 0", minHeight: "60px"
                        }}>스위트하게~위트있게~
                        밀맥주 맛에 Tropical Fruit의
                        달콤함이 어우러진 곰표 우리나라 밀맥주
                    </span>

                </Grid>

                <hr/>

                <Grid>
                    <span style={{ fontWeight: "700"}}>그래프</span>
                    
                </Grid>
                <Graph>
                    <TasteGraph/>
                </Graph>

                <hr/>

                <Grid>
                    <span style={{ fontWeight: "700",paddingBottom: "14px"}}>판매처</span>
                    <div style={{display: "flex"}}>
                    <button/> 
                    <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>GS25 편의점</span>
                    </div>    
                    


                </Grid>
                <hr/>
                
                <Grid>
                    <span style={{ fontWeight: "700" ,paddingBottom: "14px"}}>제보된 판매처</span>
                    <div style={{display: "flex"}}>
                    <button/> 
                    <span style={{ fontWeight: "300", fontSize: "12px", lineHeight: "146%"}}>GS25 편의점</span>
                    </div>
                    
                    <ReportButton>장소 제보하기</ReportButton>

                </Grid>
                <hr/>

                <Grid>

                <span style={{ fontWeight: "700",paddingBottom: "14px"}}>리뷰</span>
                </Grid>
            </Container>



        </React.Fragment>

    )

}

export default BeerDetail;



const Container = styled.div`
    
    
    span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-align:left;
    }
`
const Img = styled.div`
    width: 360px;
    height: 380px;
    border-radius: 10px;
    background-color: #F6F6F6;
    margin: -8px; 
    img{ 
        //들어갈 예정
    }

`

const Grid = styled.div`
    width: 274px;
    margin: 20px 24px;
`
const Horizion = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

`

const Graph = styled.div`
    margin: 14px 15px;
    display: flex;
    width: 313px;
    height: 313px;
    border: 2px solid #FFC44F; 
    border-radius: 10px;
`

const ReportButton = styled.button`
    width: 308px;
    height: 45px;
    border-radius: 50px;
    border: 1px solid #FFC44F;
    background-color: #fff;
    margin-top: 16px;


`

const TasteTag = styled.div`
    display: inline-block;
    width: 36px;
    height: 16px;
    border: 0.5px solid #888888;
    box-sizing: border-box;
    border-radius: 33px;
    font-size: 10px;
    text-align:center;
    line-height: 14px;
    color: #555;
`;