export const getProducts = async (filters) => {
    console.log(filters)
    let body = {};
    body.priceMin = filters[0];
    body.priceMax = filters[1];

    const response = await fetch(`http://localhost:3000/products/filter`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    const json = await response.json();
    return json;
}
export const getPriceRange = async () => {
    const result = await fetch(`http://localhost:3000/products/priceRange`);
    const response = await result.json();
    const arr = [response.minPrice, response.maxPrice]
    return arr;
};