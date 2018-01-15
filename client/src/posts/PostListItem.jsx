import React from "react";


export const PostListItem = (props) => (
    <tr>
        <td>{props.post.author}</td>
        <td>{props.post.title}</td>
    </tr>
);