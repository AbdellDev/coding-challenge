import React, { Component } from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import Items from './components/cards';

class App extends Component {
  state={
    currentdate:DateTime.local(),
    currentpage:1,
    repos:[],
    scrolling:false
  }
  componentDidMount(){
    this.addRepos()
    this.scroller=window.addEventListener("scroll",this.handleScroll)
  }
  addRepos=()=>{
    const {currentdate,currentpage,repos}=this.state;
    const dateAsString=(currentdate.plus({days:-30})).toString().slice(0,10);
    axios.get(`https://api.github.com/search/repositories?q=created:>${dateAsString}&sort=stars&order=desc&page=${currentpage}`)
         .then(resp=>{
           this.setState({
             repos:[...repos,...resp.data.items],
             scrolling:false
           })
         });
  }
  loadMore=()=>{
    this.setState((prevState)=>({
      currentpage: prevState.currentpage+1,
      scrolling:true
    }))
    this.addRepos();
  }
  handleScroll=()=>{
    const {currentpage,scrolling}=this.state;
    if(window.pageYOffset+window.innerHeight>=window.innerHeight+400 && !scrolling && currentpage<=34){
      this.loadMore();
    }
  }
  render() {
    return (
      <div>
        <h1>GitHub Repositories</h1>
          <Items repos={this.state.repos} currentdate={this.state.currentdate}/>
      </div>
    );
  }
}

export default App;
