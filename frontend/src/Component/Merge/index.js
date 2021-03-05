import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';



const Merge = (pprops) => {
  const [files, setFiles] = useState([]);

  const data = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file, fileList);
      }
    },
    defaultFileList: [],
  };
  const getFiles = (e) => {
    console.log(e)
  }
  return (
    <div>
    <Upload {...data}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
    </div>
  );
};


Merge.propTypes = {

};


export default Merge;
