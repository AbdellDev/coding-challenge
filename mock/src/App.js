import React, { Component } from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import Items from './components/cards';

class App extends Component {
  state={
    currentdate:DateTime.local(),
    currentpage:1,
    repos:[]
  }
  componentDidMount(){
    this.addRepos();
  }
  addRepos=()=>{
    const {currentdate,currentpage,repos}=this.state;
    const dateAsString=(currentdate.plus({days:-30})).toString().slice(0,10);
    axios.get(`https://api.github.com/search/repositories?q=created:>${dateAsString}&sort=stars&order=desc&page=${currentpage}`)
         .then(resp=>{
           this.setState({
             repos:[...repos,...resp.data.items]
           })
         });
  }
  loadMore=()=>{
    this.setState((prevState)=>({
      currentpage: prevState.currentpage++
    }),this.addRepos())
  }
  render() {
    return (
      <div>
        <h1>GitHub Repositories</h1>
          <Items repos={this.state.repos} currentdate={this.state.currentdate}/>
          <a onClick={this.loadMore}>LoadMore</a>
      </div>
    );
  }
}

export default App;
