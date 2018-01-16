import React from "react";


export const PostListItem = (props) => (
    <div className="card" style={{width: '18rem'}}>
        <img className="card-img-top" width="200px" src={props.post.image} alt="Post Image" />
        <div className="card-body">
            <h5 className="card-title">{props.post.title}</h5>
            <p className="card-text">{props.post.content}
            <a href="#">See More...</a>
            </p>
        </div>
    </div>
);