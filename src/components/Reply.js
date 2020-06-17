import React, { useState, useEffect, Fragment } from 'react'
import { Comment, Avatar, Form, Button, List, Input } from 'antd'
import { Document, Page } from "react-pdf"
import moment from 'moment'


const { TextArea } = Input

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        ส่งความคิดเห็น
      </Button>
    </Form.Item>
  </>
)

const Reply = (props) => {
  const [comments, setComments] = useState([
    {
      author: 'อาจารย์สยาม แย้มแสงสังข์ (อาจารย์ที่ปรึกษา)',
      avatar:  <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ส</Avatar>,
      content: <p>ตรวจสอบคำผิดในหน้าที่ 2 ด้วยครับ</p>,
      datetime: moment("20200610", "YYYYMMDD").startOf('day').fromNow(),
    },
    {
      author: 'ชนาภา (ผู้สร้างโครงการ)',
      avatar:  <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ช</Avatar>,
      content: <p>แก้ไขเรียบร้อยเเล้วค่ะ มีตรงไหนต้องแก้อีกไหมคะ</p>,
      datetime: moment("20200612", "YYYYMMDD").startOf('day').fromNow(),
    },
  ])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')


  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments(
        [
          {
            author: 'ชนาภา (ผู้สร้างโครงการ)',
            avatar:  <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ช</Avatar>,
            content: <p>{value}</p>,
            datetime: moment().fromNow(),
          },
          ...comments
        ],
      )
    }, 1000)
  }

  const handleChange = e => {
    setValue(e.target.value)
  }


  return (
    <Fragment>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>ช</Avatar>
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </Fragment>
  )
}


export default Reply