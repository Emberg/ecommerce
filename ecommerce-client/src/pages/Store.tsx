import { Link } from 'react-router'
import { useProduct } from '../hooks/useProducts'
import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';

export const Store = () => {
  const {products, isLoading, error, fetchProductsHandler} = useProduct();
  const {handleAddToCart} = useCart();
  
  useEffect(() => {
    fetchProductsHandler();
  }, [])
 
  if (isLoading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div>
      <h2>Store</h2>

        <section id="store-list">
        {
            products.map((product) => (
                <article className="list-group-item" key={product.id}>
                    <section>
                        <img style={{width:"100px", height:"100px"}} src={product.image}></img>
                    </section>
                    <section>
                        <p><Link to={`/product/${product['id']}`}>&nbsp;{product.name}</Link></p>
                        <p>&nbsp;{product.price} SEK</p>
                    </section>
                    <section>
                        <button style={{width:"100px"}} onClick={() => {handleAddToCart(product, 1)}}>Add to cart</button>
                    </section>
                    
                </article>               
            ))
        }
        </section>

    </div>
  )
}
