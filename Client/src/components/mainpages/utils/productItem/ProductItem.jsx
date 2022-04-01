import React,{useContext,useState} from "react";
import {Link} from "react-router-dom"
import axios from "axios"
import Loader from "../Loading/Loading"
import {globalState} from './../../../../globalState'

function ProductItem({ product, isAdmin,token,callback, setCallback }) {
    const [load, setLoad] = useState(false)
    const state = useContext(globalState)
    const [products, setProducts] = state.productsApi.products

    const handleCheck = (id) =>{
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

  const deleteProduct = async(id, public_id) => {
   if(window.confirm("Are you sure you want to delete this product")){
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
  }

  if(load) return <div className="product_card"><Loader/> </div>
  return (
    <div className="product_card">
         {
                isAdmin && <><input type="checkbox" checked={product.checked}
                onChange={() => handleCheck(product._id)} />
                
                </>
            
        }
      <img src={product.images.url} alt="" />
      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>₹{product.price}</span>
        <p>{product.description}</p>
      </div>

      <div className="row_btn">
      {
                isAdmin ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product._id, product.images.public_id)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product._id}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                        Buy
                    </Link>
                    <Link id="btn_view" to={`/detail/${product._id}`}>
                        View
                    </Link>
                </>
            }
      </div>
    </div>
  );
}

export default ProductItem;
