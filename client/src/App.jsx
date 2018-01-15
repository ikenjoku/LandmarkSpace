import React from 'react';
import ReactDOM from 'react-dom';

import {PostList} from './posts/PostList.jsx';

class Hello extends React.Component{
    render(){
        return(
            <div className='container-fluid'>
                <h4>LandMarkSpace Landing Page</h4>
                <PostList/>
            </div>
        );
    }
}

ReactDOM.render(<Hello />, document.querySelector('#contents'));


if (module.hot){
    module.hot.accept();
}
