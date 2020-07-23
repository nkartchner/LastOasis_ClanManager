import React from "react";
import { Post } from "../../../models/post";
import { TextField, Button } from "@material-ui/core";

interface Props {
  submit: (post: string) => void;
  editPost: Post | null;
}

const PostForm: React.FC<Props> = ({ submit, editPost }) => {
  const [post, setPost] = React.useState<string>(editPost?.content || "");

  const handleSubmit = () => {
    if (post.length > 2) {
      submit(post);
      setPost("");
    }
  };
  React.useEffect(() => {
    if (editPost) {
      setPost(editPost.content);
    }
  }, [editPost]);
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <TextField
        multiline
        fullWidth
        value={post}
        color="primary"
        variant="outlined"
        style={{ margin: "16px 0" }}
        onChange={(e) => setPost(e.target.value)}
      />

      <div
        style={{
          display: "flex",
          flex: "1 1 100%",
          width: "100%",
          margin: "10px 0",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "nowrap",
        }}
      >
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PostForm;
