import React from 'react'

export default function Pagination(props) {
  return (
    <div>
      <button type="button" onClick={() => props.decrementPage()}>
        {'<'} Previous Page
      </button>
      <span> Page {props.currentPage} </span>
      <button type="button" onClick={() => props.incrementPage()}>
        Next Page {'>'}
      </button>
    </div>
  )
}
