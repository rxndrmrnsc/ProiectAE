import { useEffect, useState } from "react";
import { getPriceRange } from "./utils";
import MultiRangeSlider from "./components/MultiRangeSlider"

const Filters = (props) => {
    const MAX_PRICE_RANGE = 9999;
    const { setFilters } = props;
    const [priceRange, setPriceRange] = useState([0, MAX_PRICE_RANGE]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(MAX_PRICE_RANGE);

    const handleGetPriceRange = async () => {
        const response = await getPriceRange();
        setPriceRange(response);
    };

    const handlePriceRangeChange = (event) => {
        console.log("setam filtrul: " + minValue + ", " + maxValue)
        setFilters([minValue, maxValue]);
    };

    useEffect(() => {
        if (priceRange[1] == MAX_PRICE_RANGE) {
            handleGetPriceRange();
        }
    }, []);

    return (
        <div className="filtersWrapper">
            <div>
                <label htmlFor="categorySelect">Price Range</label>
            </div>
            <div>
                {/* <MultiRangeSlider
                    min={0}
                    max={MAX_PRICE_RANGE}
                /> */}
                <label htmlFor="categorySelect">Min Price</label>
                <input type="text" id="minPrice" name="minPrice" value={minValue} onChange={(evt) => setMinValue(evt.target.value)}></input>
                <br />
                <label htmlFor="categorySelect">Max Price</label>
                <input type="text" id="maxPrice" name="maxPrice" value={maxValue} onChange={(evt) => setMaxValue(evt.target.value)}></input>
                <br />
                <button onClick={handlePriceRangeChange}>Change filter</button>
            </div>
        </div>
    );
};

export default Filters;