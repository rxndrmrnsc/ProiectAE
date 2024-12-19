import { Slider } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { getPriceRange } from "./utils";

const Filters = (props) => {
    const { setFilters } = props;
    const [priceRange, setPriceRange] = useState(null);

    const handleGetPriceRange = async () => {
        const response = await getPriceRange();
        setPriceRange(response);
    };

    const handlePriceRangeChange = (event) => {
        setFilters((prevFilters) => ({
            minPrice: event.value[0],
            maxPrice: event.value[1]
        }));
    };

    useEffect(() => {
        if (!priceRange) {
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
                    maxValue={priceRange.maxPrice}
                    minValue={priceRange.minPrice}
                    step={10}
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                />
                <p className="text-default-500 font-medium text-small">
                    Selected budget: {Array.isArray(value) && value.map((b) => `${b}`).join(" – ")}
                </p>
            </div>
        </div>
    );
};

export default Filters;