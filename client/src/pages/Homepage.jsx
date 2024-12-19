import { useState } from "react";
import Products from "..components/Products";
import Filters from "..components/Filters";

function Homepage() {
  const [filters, setFilters] = useState({
    category: "",
  });

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