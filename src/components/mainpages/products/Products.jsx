import React,{useContext, useState} from 'react'
import {globalState} from './../../../globalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/Loading/Loading'
import axios from 'axios'
import Filter from './Filter'
import LoadMore from './LoadMore'
function Products() {
  const [isCheck, setIsCheck] = useState(false)
  const [load, setLoad] = useState(false)
    const state = useContext(globalState)
    const [products, setProducts] = state.productsApi.products
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsApi.callback 

    const checkAll = () =>{
      products.forEach(product => {
          product.checked = !isCheck
      })
      setProducts([...products])
      setIsCheck(!isCheck)
  }
  const deleteProduct = async(id, public_id) => {
     try {
         setLoad(true);
         const destroyImg = axios.post('/api/destroy', {public_id},{
             headers: {Authorization: token}
         })
         const deleteProduct = axios.delete(`/api/products/${id}`, {
             headers: {Authorization: token}
         })
 
         await destroyImg
         await deleteProduct
         setLoad(false)
         setCallback(!callback)
     } catch (err) {
         console.log(err)
     }
    }
  const deleteAll = () =>{
      if(window.confirm('Are you sure you want to delete Selected Products')){
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
      }
  }
  
  return (  
    <>
    <Filter />
    {
      isAdmin &&  <div className="delete-all">
      <span>Select all</span>
      <input type="checkbox" checked={isCheck} onChange={checkAll} />
      <button onClick={deleteAll}>Delete ALL</button>
      </div>
    }  
    <div className="products">
      
        {
            products.map(products => {
                return <ProductItem key={products._id} product={products}  isAdmin={isAdmin} token={token} callback={callback} setCallback={setCallback}/>
            })
        }
    </div>
    <LoadMore />
    {products.length === 0 && <Loading />}
    </>
  )
}

export default Products