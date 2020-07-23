import React from "react";
import Axios from "axios";
import { Post } from "../../../models/post";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { User } from "../../../models";
import PostForm from "./PostForm";
import TimeAgo from "react-timeago";
interface Props {
  clanId: number;
  user: User;
}

const PostList: React.FC<Props> = ({ clanId, user }) => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  React.useEffect(() => {
    Axios.get<Post[]>(`/api/post/clan/${clanId}`)
      .then((response) => setPosts(response.data))
      .catch((err) => console.log(err));
  }, [clanId]);

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
  };

  const handleSubmit = (post: string | Post) => {
    if (typeof post === "string") {
      Axios.post<Post>(`/api/post`, {
        clanId,
        content: post,
        userId: user.id,
      })
        .then((response) => setPosts([...posts, response.data]))
        .catch((err) => console.log(err));
    } else {
      Axios.put<Post>(`/api/post/update/${post.id}`).then((response) =>
        setPosts(posts.map((p) => (p.id === post.id ? response.data : p)))
      );
    }
  };

  return (
    <div style={{ overflow: "auto" }}>
      <PostForm editPost={selectedPost} submit={handleSubmit} />
      {posts.map((p) => (
        <div key={p.id}>
          <div>
            posted <TimeAgo date={p.createdAt.valueOf()} />
          </div>
          {(user.id === p.userId ||
            user.role === "Founder" ||
            user.role === "Leader") && (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleEdit(p)}
            >
              Edit
            </Button>
          )}

          <Typography
            paragraph
            dangerouslySetInnerHTML={{ __html: p.content }}
          />
        </div>
      ))}
    </div>
  );
};

export default PostList;
