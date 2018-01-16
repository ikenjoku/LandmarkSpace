import React from "react";
import 'whatwg-fetch';

import { PostListItem } from "./PostListItem.jsx";



export class PostList extends React.Component{
    constructor(){
        super();
        this.state = {posts: []}
    }

    componentDidMount(){
        this.loadData()
    }

    loadData(){
        fetch('/api/v1/posts').then( response => {
            if(response.ok){
                return response.json();
            }
            throw new Error('Request failed!');
        }, networkError => console.log(networkError.message))
        .then(jsonResponse =>{
            console.log('Some data recieved from server');
            jsonResponse.forEach(post => {
                post.createdAt = new Date(post.createdAt);
            });
            this.setState({posts: jsonResponse});
        })
    }

    render(){
        const postRows = this.state.posts.map(post => <PostListItem key={post._id} post={post} />);

        return(
            <article className="postArticle">
            <h4>List of Posts</h4>
                {postRows}
            </article>
        );
    }
}