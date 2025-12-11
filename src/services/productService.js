// Product service that fetches from https://fakestoreapi.com/products
// Returns an array of products mapped to the shape used by the app.

const API_URL = "https://fakestoreapi.com/products";

export async function getProducts() {
	const res = await fetch(API_URL);
	if (!res.ok) {
		throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
	}
	const data = await res.json();

	// Map fakestore fields to our app's expected shape
	return data.map((p) => ({
		id: p.id,
		name: p.title,
		category: p.category,
		price: Number(p.price),
		rating: (p.rating && p.rating.rate) ? Number(p.rating.rate) : 0,
		image: p.image,
	}));
}

export default { getProducts };
