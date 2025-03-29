/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { IProduct } from '../models/IProduct';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../hooks/useCart';

export const ProductPage = () => {
  const [product, setProduct] = useState<IProduct | null>(null); 
  const params = useParams();
  const {isLoading, error, fetchProductByIdHandler} = useProduct();
  const {handleAddToCart} = useCart();

  useEffect(() => {
    if (!params.id) return;
    fetchProductByIdHandler(params.id).then((data) => setProduct(data));  
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p> 

  return (
    <div style={{
      width: "75%",
      height: "50%"
    }}>
        <h2>Product Page</h2>

        <section style={{width:"550px"}} id="store-list">
            <article className="list-group-item" key={product?.id}>
                        <section>
                            <img style={{width:"300px", height:"300px"}} src={product?.image}></img>
                        </section>
                        <section style={{paddingLeft:"20px"}}>
                            <h3>{product?.name}</h3>
                            <p>{product?.description}</p>
                            <p>{product?.price} SEK</p>
                            <p>{product?.stock} in stock</p>
                            <button style={{width:"100px"}} onClick={() => {handleAddToCart(product!, 1)}}>Add to cart</button>
                        </section>
                        
            </article>
        </section>
        <Link to="/" className='back-link'>&#x2190; back</Link>
    </div>
  )
}
