import React, { Component } from 'react';
import axios from 'axios';
import {DateTime} from 'luxon';
import Items from './components/cards';

class App extends Component {
  state={
    currentdate:DateTime.local(),
    currentPage:1,
    repos:[]
  }
  componentDidMount(){
    const {currentdate}=this.state;
    const refDate=currentdate.plus({days:-30});
    const dateString=refDate.toString().slice(0,10);
    console.log(dateString);
    axios.get(`https://api.github.com/search/repositories?q=created:>${dateString}&sort=stars&order=desc`)
         .then(resp=>{
           this.setState({
             repos:resp.data.items
           })
         });
  }
  render() {
    return (
      <div>
        <h1>GitHub Repos</h1>
          <Items repos={this.state.repos} currentdate={this.state.currentdate}/>
      </div>
    );
  }
}

export default App;
