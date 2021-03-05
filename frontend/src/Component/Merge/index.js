import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';


const Merge = (pprops) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const config = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([...fileList, file])
      return false;
    },
    fileList
  };
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    setUploading(false)
    
    axios({
      url: '/api/upload',
      method: 'post',
      data: formData,
      success: () => {
        setFileList([])
        setUploading(false)
        message.success('upload successfully.');
      },
      error: () => {
        setUploading(false)
        message.error('upload failed.');
      },
    });
  }

  useEffect(() => {}, [])

  return (
    <>
      <div>
        <Upload {...config}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Merging' : 'Start Merge'}
        </Button>
      </div>
    </>
  );
};

export default Merge;
