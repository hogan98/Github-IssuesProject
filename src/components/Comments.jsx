import { formatDistance } from "date-fns";
import React from "react";
import { useQuery } from "react-query";

export default function Comments({ issueNumber }) {
  const fakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const {
    isLoading,
    isSuccess,
    data: comments,
  } = useQuery(["comments", issueNumber], fetchComments);

  function fetchComments() {
    return fetch(
      `https://api.github.com/repos/facebook/create-react-app/issues/${issueNumber}/comments}`
    ).then(response => response.json());
  }
  return (
    <>
      {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <>
          {comments.map(comment => (
            <div key={comment.id} className="comment-container">
              <a href="#">
                <img
                  src={comment.user.avatar_url}
                  alt="avatar"
                  className="avatar"
                />
              </a>
              <div className="comment">
                <div className="comment-heading">
                  <a href="#">{comment.user.login}</a> commented{" "}
                  {formatDistance(new Date(comment.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </div>
                <div className="comment-body">{comment.body}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
}
