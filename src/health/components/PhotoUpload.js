import React, { useEffect, useState } from 'react';
import { Box, Button, Text } from 'grommet';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  width: 180,
  height: 240,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


const PhotoUpload = () => {
  const maxSize = 5242880;

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles } = useDropzone({
    accept: 'image/jpeg, image/png, image/gif',
    multiple: false,
    minSize: 0,
    maxSize: maxSize,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={file.name}
        />
      </div>
    </div>
  ));

  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
  const isFileExist = files.length > 0;

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const uploadImg = files.forEach(file => {
    let url = 'http://52.79.235.166/';
    let formData = new FormData();
    formData.append("file", file);

    axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => { alert(`upload 성공`) })
      .catch(e => { alert(`upload 실패`) })
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {!isDragActive && !isFileExist && (
          <Box fill align="center" alignContent="stretch">
            <Text textAlign="center" size="small">
              사진 업로드
              <br />
              이곳을 클릭하거나
              <br />
              사진을 드래그 해주세요
              <br />
              (jpg, png, gif, 최대 5MB)
              <br />
            </Text>
          </Box>
        )}
        {isDragActive && !isDragReject && (<Text textAlign="center" size="small">사진을 이곳에 드래그 해주세요</Text>)}
        {isDragReject && (<Text textAlign="center" size="small" color="status-error">올릴 수 없는 형태의 파일입니다</Text>)}
        {isFileTooLarge && (<Text textAlign="center" size="small" color="status-error">파일의 크기가 5MB 이상입니다</Text>)}
        {isFileExist && (
          <Box align="center">
            <div style={thumbsContainer}>
              {thumbs}
            </div>
            <Button primary type="submit" color="dark-2" label="업로드" onClick={uploadImg} />
          </Box>
        )}
      </div>
    </section>
  );
}

export default PhotoUpload;