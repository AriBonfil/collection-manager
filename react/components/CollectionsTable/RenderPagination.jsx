import React, {useState} from 'react'
import Pagination from 'rc-pagination'
import './rc-pagination.css'
const RenderPagination = ({props}) => {

const [current, setcurrent] = useState(1)

 const onChange = page => {
    setcurrent(page)
  };

  return (
    <>
    <Pagination
    onChange={onChange}
    current={current}
    total={props.total}
  />

  </>
  )
}

export default RenderPagination
