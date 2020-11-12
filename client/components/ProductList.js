import React from 'react'
import {Link} from 'react-router-dom'

export default function Product(props) {
  const singleProduct = props.product

  return (
    <div className="media">
      <div className="media-left">
        <a href="#">
          <Link to={`/products/${singleProduct.id}`}>
            <img className="media-object" src={singleProduct.imageUrl} />
          </Link>
        </a>
      </div>
      <div className="media-body">
        <Link to={`/products/${singleProduct.id}`}>
          <h4 className="media-heading">{singleProduct.name}</h4>
        </Link>
        <p>{`$${singleProduct.price}`}</p>
      </div>
    </div>
  )
}
