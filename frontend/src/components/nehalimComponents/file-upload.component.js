import React, { useState, Component } from "react";
import "../../css/fileUpload.css";
import ImageEnd from "../../images/login.jpg";
import ImageStart from "../../images/images.jpg"
import { node_host, node_port } from "../../config"; 
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import UploadAlert from './uploadAlert.component';

const FileUpload = () => {
  const [status, setStatus] = useState("Drop Here");
  const [percentage, setPercentage] = useState(0);
  const [preview, setPreview] = useState(null);

  const doNothing = event => event.preventDefault();

  const onDragEnter = event => {
    setStatus("File Detected");
    event.preventDefault();
    event.stopPropagation();
  };

  const onDragLeave = event => {
    setStatus("Drop Here");
    event.preventDefault();
  };

  const onDragOver = event => {
    setStatus("Drop");
    event.preventDefault();
  };

  const onDrop = event => {
    var i;
    var length = (event.dataTransfer.files).length;
    for (i=0; i<length; i++) {
      var supportedFilesTypes = ["application/pdf"];
      var { type } = event.dataTransfer.files[i];
      if (supportedFilesTypes.indexOf(type) > -1){
        // Begin Reading File
        var reader = new FileReader();
        reader.onload = e => setPreview(e.target.result);
        reader.readAsDataURL(event.dataTransfer.files[i]);

        //Create Form Data
        var payload = new FormData();
        payload.append("file", event.dataTransfer.files[i]);

        //XHR - New XHR Request
        var xhr = new XMLHttpRequest();

        //XHR - Upload Progress
        xhr.upload.onprogress = (e) => {
          var done = e.position || e.loaded
          var total = e.totalSize || e.total;
          var perc = (Math.floor(done/total*1000)/10);
          if (perc >= 100) {
            setStatus('Done');  
          } else {
            setStatus(`${perc}%`);
          }
          setPercentage(perc);
        };


        //XHR - Make Request
        xhr.open("POST", "http://" + node_host + ":" + node_port + "/api/upload");
        xhr.send(payload);
      }
      console.log(event);
      event.preventDefault();
    }
  };
  return (
    
    <div
      className="App2"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={doNothing}
      onDrop={onDragLeave}
    >
    <UploadAlert />
      <div
        className={`DropArea ${status === "Drop" ? "Over" : ""}`}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onDragLeave={onDragLeave}
      >
        <h1 style={{ margin: "25px" }}> <i className="fas fa-upload mr-3 blue-text"> </i> </h1>
        <div className={`ImageProgress ${preview ? "Show" : ""}`}>
          <div
            className="ImageProgressImage"
            style={{ backgroundImage: `url(${ImageEnd})` }}
          />
          <div
            className="ImageProgressUploaded"
            style={{ backgroundImage: `url(${ImageEnd})`, clipPath: `inset($100 - Number(percentage)}% 0 0 0);` }}
          />
        </div>
        
        <div className={`Status ${status.indexOf('%') > -1 || status === 'Done' ? 'Uploading' : ''}`}>{status}</div>
      </div>
    </div>
  );
};

export default FileUpload;
