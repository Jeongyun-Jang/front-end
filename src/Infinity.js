import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _, { set } from "lodash";
import { getBeerInfinity, getAllBeer } from "./redux/async/beer";
import { InfinityBeer, getBeerList } from "./redux/reducer/beerSlice";

const Infinity = () => {
    const [loading, setLoading] = useState(false);
    const [paging, setPaging] = useState(0);
    const beers = useSelector(InfinityBeer);
    const dispatch = useDispatch();

    const getInfinityList = async () => {
        if(paging >= 6){
            return;
        }
        setLoading(true);
        await dispatch(getBeerInfinity(paging));
        setLoading(false);
    };

    const _handleScroll = _.throttle(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight >= scrollHeight && loading === false) {
          // 페이지 끝에 도달하면 추가 데이터를 받아온다
          setPaging(paging + 1);
          getInfinityList();
        }
    }, 700);

    useEffect(() => {
        if(paging === 0){
            dispatch(getBeerInfinity(paging));
            setPaging(paging+1);
        }
    }, []);

    useEffect(() => {
        if(loading){
            return;
        }
        window.addEventListener("scroll", _handleScroll); // scroll event listener 등록
        return () => {
            window.removeEventListener("scroll", _handleScroll); // scroll event listener 해제
        };
    }, [paging]);

    return (
        <React.Fragment>
            {beers?.map((item, idx) => (
                <Div>{item.name_korean}</Div>
            ))}
            {loading ? <h1>loading...</h1> : ""}
        </React.Fragment>
    )
}

export default Infinity;

const Div = styled.div`
    display: inline-block;
    margin: 15px;
    width: 200px;
    height: 250px;
    border: 1px solid black;
`;