import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {PostList} from './posts/PostList.jsx';
import NavBar from "./navBar/NavBar.jsx";
import BuzzList from "./buzzes/BuzzList.jsx";
import Footer from "./footer/Footer.jsx";
import EventList from "./events/EventList.jsx";
import AdList from "./ads/AdList.jsx";

class App extends React.Component{
    render(){
        return(
            <div className='container-fluid'>
                <NavBar/>
                <main>
                <BuzzList/>
                <section>
                    <PostList/>
                    <EventList/>
                    <AdList/>
                </section>
                </main>
                <Footer />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('#contents'));


if (module.hot){
    module.hot.accept();
}
