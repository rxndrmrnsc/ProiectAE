import { useEffect, useState } from "react";
import { getProducts } from "./utils";

function Products(props) {
  const { filters, setFilters } = props;
  const [products, setProducts] = useState([]);

  const handleGetProducts = async () => {
    const data = await getProducts(filters);
    setProducts(data);
  };

  useEffect(() => {
    handleGetProducts();
  }, [filters]);

  return (
    <div className="products-container">
      {products?.map((product) => (
        <div key={product.id} className="product-card">
          <h2 className="product-title">{product.name}</h2>
          <h4 className="product-title">{product.description}</h4>
          <h4 className="product-title">{product.status}</h4>
          <div className="price-cart">
            <p className="price">${product.price.toFixed(2)}</p>
            <div>
              <button
                className="add-to-cart">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;