export const getProducts = async (filters) => {
    let url = `${import.meta.env.API_URL}/`
    if (filters.priceRange) {
        url += `/filter/`
    }
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
export const getPriceRange = async () => {
    const result = await fetch(`${import.meta.env.API_URL}/products/priceRange`);
    const response = await result.json();
    return response;
};