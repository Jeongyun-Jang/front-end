import React from "react";
import {createGlobalStyle} from "styled-components";
import {Route} from "react-router-dom";
import { history } from "./redux/configureStore";
import { ConnectedRouter } from "connected-react-router";

import {Main, Test, Beers, Mypage } from "./pages/indexPage";

function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Main}/>
        <Route path="/test"  component={Test}/>
        <Route path="/beers"  component={Beers}/>
        <Route path="/mypage" component={Mypage}/>
      </ConnectedRouter>
    </React.Fragment>   
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body{
    font-family: "Noto Sans KR", sans-serif;
    font-size: "14px";
    font-weight: "500";
    line-height: "20px";
    //background-color: #F2F3F7;
  }
`;