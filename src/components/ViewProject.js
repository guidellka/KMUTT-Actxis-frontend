import React from 'react'
import { Spin } from 'antd'
import PDFViewer from 'pdf-viewer-reactjs'


const ViewProject = (props) => {

  return (
      <PDFViewer
        style={{ backgroudColor: 'pink'}}
        navbarOnTop={true}
        loader={<Spin />}
        onDocumentClick={true}
        hideRotation={true}
        document={{
          url: 'http://minio-kmuttactxis.phornlert.me:9000/documents/mock%20document.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIOSFODNN7EXAMPLE%2F20200617%2F%2Fs3%2Faws4_request&X-Amz-Date=20200617T195620Z&X-Amz-Expires=432000&X-Amz-SignedHeaders=host&X-Amz-Signature=6de22a701d0bb4299923bfce28594146523f5434dedafc39659451ae5eafe4db',
        }}
      />
  )
}

export default ViewProject