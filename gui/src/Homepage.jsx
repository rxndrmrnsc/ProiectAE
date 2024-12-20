import { useState } from "react";
import Products from "./Products";
import Filters from "./Filters";

function Homepage() {
  const MAX_PRICE_RANGE = 9999999;
  const [filters, setFilters] = useState([0, MAX_PRICE_RANGE]);

  return (
    <div className="homepageWrapper">
      <Filters setFilters={setFilters} />
      <div>
        <Products filters={filters} setFilters={setFilters} />
      </div>
    </div>
  );
}

export default Homepage;