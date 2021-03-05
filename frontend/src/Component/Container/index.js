import React, { Component } from 'react';
import ViewSDKClient from '../../common/ViewSDKClient';

class SizedContainer extends Component {
    componentDidMount() {
        const viewSDKClient = new ViewSDKClient();
        viewSDKClient.ready().then(() => {
            /* Invoke file preview */
            viewSDKClient.previewFile("pdf-div", {
                /* Pass the embed mode option here */
                embedMode: "SIZED_CONTAINER"
            });
        });
    }

    render() {
        return <div id="pdf-div" className="sized-container-div"/>;
    }
}

export default SizedContainer;
