import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "./postsSlice";

const AddNewPost = () => {
  const dispatch = useDispatch();

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [text, setText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const onTextChanged = (e) => setText(e.target.value);
  const onMediaFileChanged = (e) => {
    const fileList = Array.from(e.target.files);
    setMediaFiles(fileList);
  };

  const canSave =
    [text, mediaFiles].some((field) => field !== "" && field.length !== 0) &&
    !(addRequestStatus === "pending");

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const response = await dispatch(
          addNewPost({ text, mediaFiles })
        ).unwrap();

        setText("");
        setMediaFiles([]);
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <View>
      <Text>AddNewPost</Text>
    </View>
  );
};

export default AddNewPost;
