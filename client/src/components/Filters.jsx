import { Slider } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { getPriceRange } from "../utils";

const Filters = (props) => {
    const MAX_PRICE_RANGE = 9999999;
    const { setFilters } = props;
    const [priceRange, setPriceRange] = useState([0, MAX_PRICE_RANGE]);

    const handleGetPriceRange = async () => {
        const response = await getPriceRange();
        setPriceRange(response);
    };

    const handlePriceRangeChange = (event) => {
        console.log("setam filtrul")
        setFilters(() => (priceRange));
    };

    useEffect(() => {
        if (priceRange[1] == MAX_PRICE_RANGE) {
            handleGetPriceRange();
        }
    }, []);

    return (
        <div className="filtersWrapper">
            <div>
                <Slider
                    className="max-w-md"
                    formatOptions={{ style: "currency", currency: "USD" }}
                    label="Select a budget"
                    minValue={0}
                    maxValue={1000}
                    step={10}
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                />
                <p className="text-default-500 font-medium text-small">
                    Selected budget: {Array.isArray(priceRange) && priceRange.map((b) => `${b}`).join(" – ")}
                </p>
            </div>
        </div>
    );
};

export default Filters;