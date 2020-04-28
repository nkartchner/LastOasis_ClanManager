//@ts-nocheck
import React from "react";
import { TextField, Button } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Post } from "../../../models/post";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
    submit: (post: string) => void;
    editPost: Post | null;
}

const PostForm: React.FC<Props> = ({ submit, editPost }) => {
    const [ck5Value, setCK5Value] = React.useState("");
    const [quillValue, setQuillValue] = React.useState("");
    const [post, setPost] = React.useState<string>(editPost?.content || "");

    const handleSubmit = (editor: "regular" | "quill" | "ck5") => () => {
        if (editor === "quill") {
            if (quillValue.length > 2) {
                submit(quillValue);
                setPost("");
                setCK5Value("");
                setQuillValue("");
            }
        } else if (editor === "ck5") {
            if (ck5Value.length > 2) {
                console.log("Submitting CK5 value");
                submit(ck5Value);
                setPost("");
                setCK5Value("");
                setQuillValue("");
            }
        } else if (editor === "regular") {
            if (post.trim()) {
                submit(post);
                setPost("");
                setCK5Value("");
                setQuillValue("");
            }
        }
    };
    React.useEffect(() => {
        if (editPost) {
            setPost(editPost.content);
            setQuillValue(editPost.content);
            setCK5Value(editPost.content);
        }
    }, [editPost]);
    return (
        <div
            style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
            <ReactQuill
                style={{ margin: "16px 0" }}
                theme="snow"
                value={quillValue}
                onChange={setQuillValue}
            />
            <TextField
                multiline
                fullWidth
                value={post}
                color="primary"
                variant="outlined"
                style={{ margin: "16px 0" }}
                onChange={(e) => setPost(e.target.value)}
            />
            <CKEditor
                editor={ClassicEditor}
                style={{ margin: "16px 0" }}
                data="<p>Hello from CKEditor 5!</p>"
                onInit={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                    setCK5Value(editor.getData());
                }}
                onBlur={(_event, editor) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(_event, editor) => {
                    console.log("Focus.", editor);
                }}
            />
            <div
                style={{
                    display: "flex",
                    flex: "1 1 100%",
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                }}
            >
                <Button
                    onClick={handleSubmit("regular")}
                    color="primary"
                    variant="contained"
                >
                    Submit Regular Text Field
                </Button>

                <Button
                    onClick={handleSubmit("quill")}
                    color="primary"
                    variant="contained"
                >
                    Submit Quill
                </Button>

                <Button
                    onClick={handleSubmit("ck5")}
                    color="primary"
                    variant="contained"
                >
                    Submit CK5
                </Button>
            </div>
        </div>
    );
};

export default PostForm;
