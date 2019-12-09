import React, { useState } from "react";
import { Upload, Button } from "antd";
// import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const handleThumbImageChange = info => {
    if (info.file.status === "done" || info.file.status === "error") {
      getBase64(info.file.originFileObj, thumbnailImageUrl =>
        setImage(thumbnailImageUrl)
      );
    }
  };
  return (
    <div className="App">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleThumbImageChange}>
        <Button>Upload</Button>
        {image !== null && (
          <img src={image} alt="avatar" style={{ width: "100%" }} />
        )}
      </Upload>
    </div>
  );
}

export default App;
