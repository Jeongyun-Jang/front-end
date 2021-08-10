import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from "../Header";

import {BeerList,BeerDetail,ReviewList} from '../componentsBeer/BeerIndex';

const Beer = (props) => {
    return (
        <React.Fragment>
            <Header/>
            <Route path="/beer/list/" exact component={BeerList}/>
            <Route path="/beer/list/:beerCategoryId" exact component={BeerList}/>
            <Route path="/beer/detail/:beerId" component={BeerDetail}/>
            <Route path="/beer/review/:beerId" component={ReviewList}/>
            <Route path="/beer/list/search/:word" component={BeerList}/>
        </React.Fragment>
    )

}

export default React.memo(Beer);
