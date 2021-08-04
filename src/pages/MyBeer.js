import React,{useState, useEffect} from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import { getAllBeer } from "../redux/async/beer";

import Slider from "../componentsBeer/Slider";
import EachBeer from "../componentsBeer/EachBeer";
import MyReview from "../componentsMypage/MyReview";
import Header from "../Header";
import "../share/style/myBeer.css";
import WritedReview from "../componentsMypage/WritedReview";
import { useDispatch, useSelector } from "react-redux";

const MyBeer = ()=>{
    const beers = useSelector(state => state.beer.beerList.beers)
    const dispatch = useDispatch();
    const [is_Dogam, setIs_Dogam] = useState(true);
    const session = sessionStorage.getItem("token");
    
    useEffect(()=> {
        setIs_Dogam(true);
        dispatch(getAllBeer());
    }, [])

    useEffect(() => {
        if(!session){
            window.alert("로그인이 필요한 서비스입니다!")
            history.push("/")
        }
    }, []);

    const mydogam = [
        {
            "hashtag": [
            "황금색",
            "안호이저 부시",
            "라이트바디"
            ],
            "like_array": [],
            "features": {"bitter": 3,"crispy": 5,"flavor": 2,"sweet": 1,"nutty": 3},
            "count": 1,
            "avgRate": 4,
            "location": [],
            "location_report": [],
            "_id": "6107a0b4e7dd0d2b2c84087c",
            "name_korean": "버드와이저",
            "name_english": "Budweiser",
            "image": "https://drive.google.com/uc?export=view&id=1VnjD_a1f1-F5sSxLndE0AfgwjMMbaEtR ",
            "degree": 5,
            "categoryId": "6107a097e7dd0d2b2c840863",
            "__v": 0
        }
    ];      
    return (
        <React.Fragment>
            <Header></Header>
        <Grid>
            <Wrap>  
            <ButtonContainerWrap> {/* 세밀한 padding 조절은 이후에 ..!=> 수정했습니다! */}
                <button
                    className={is_Dogam === true ? "clickedButtonContainer" : "buttonContainer"}
                    onClick={()=>{
                        setIs_Dogam(true)
                    }}>
                    맥주 도감
                </button>
                <button 
                    className={is_Dogam === false ? "clickedButtonContainer" : "buttonContainer"}
                    onClick={()=>{
                        setIs_Dogam(false)
                    }
                    }>
                    내가 쓴 게시물
                </button>
            </ButtonContainerWrap>
            <SliderWrap>
            <Slider
                    items={[
                        "All",
                        "Lager",
                        "Pilsner",
                        "Pale Ale",
                        "IPA",
                        "Weizen",
                        "Dunkel",
                        "Stout",
                    ]}/>
            </SliderWrap>
            {is_Dogam == true ? 
                <List>
                {mydogam.length > 0 ? mydogam.map((item, idx) => (
                    <EachBeer key={idx} item={item} 
                        _onClick={() =>{
                            history.push("/beer/detail")
                        }
                    }/>
                )):""}
                </List>
            : <MyReview> 
                <Container>
                    <WritedReview/>
                    <WritedReview/>
                    <WritedReview/>
                </Container>
              </MyReview>
            }
            </Wrap>
        </Grid>


        </React.Fragment>
    )
}

export default MyBeer;

const Grid = styled.div`
    display: flex;
    height: 754px;
    background-color: #FFFFFF;
    flex-direction: column;
`;

const ButtonContainerWrap = styled.div`
    display: flex;
    width: 312px;
    margin: 0 auto;
    margin-bottom: 17px;
    justify-content: space-between;
`;

const Wrap = styled.div`
    width: 360px;
    margin: 0 auto;
    margin-top: 65px;
`;

const SliderWrap = styled.div`
    margin: 0 0 20px 0px;
`;

const List = styled.div`
    width: 312px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
`;

const Container = styled.div`
    margin-top: 60px;
`
