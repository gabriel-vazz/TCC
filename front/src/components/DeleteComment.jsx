const DeleteComment = ({ commentId, deleteId, message }) => {
  if(deleteId.includes(commentId)) {
    return (
      <div className="deleteCommentMessage">
        {message}
      </div>
    )
  }
}

export default DeleteComment