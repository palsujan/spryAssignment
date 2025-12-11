import { useEffect, useMemo, useState } from "react";
import ProductGrid from "../components/products/ProductGrid";
import Header from "../components/layout/Header";
import ProductDetail from "../components/products/ProductDetail";
import FilterBar from "../components/filters/FilterBar";
import Pagination from "../components/common/Pagination";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import FavoritesPage from "./FavoritesPage";
import { getProducts } from "../services/productService";
import "../styles/App.css";

const ProductListingPage = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showFavorites, setShowFavorites] = useState(false);

	const [selectedCategory, setSelectedCategory] = useState("All");
	const [minRating, setMinRating] = useState(0);
	const [sortBy, setSortBy] = useState("none");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	const [favorites, setFavorites] = useState(() => {
		try {
			const raw = localStorage.getItem("favorites");
			return raw ? new Set(JSON.parse(raw)) : new Set();
		} catch (e) {
			return new Set();
		}
	});

	useEffect(() => {
		setLoading(true);
		setError(null);
		getProducts()
			.then((res) => {
				setProducts(res);
			})
			.catch((err) => {
				console.error(err);
				setError("Failed to load products.");
			})
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(
				"favorites",
				JSON.stringify(Array.from(favorites))
			);
		} catch (e) {
			// ignore
		}
	}, [favorites]);

	const categories = useMemo(() => {
		const set = new Set(products.map((p) => p.category));
		return Array.from(set);
	}, [products]);

	const filtered = useMemo(() => {
		let list = products.slice();
		if (selectedCategory !== "All") {
			list = list.filter((p) => p.category === selectedCategory);
		}
		if (minRating > 0) {
			list = list.filter((p) => p.rating >= minRating);
		}
		if (sortBy === "asc") list.sort((a, b) => a.price - b.price);
		if (sortBy === "desc") list.sort((a, b) => b.price - a.price);
		return list;
	}, [products, selectedCategory, minRating, sortBy]);

	const totalPages = Math.ceil(filtered.length / itemsPerPage);
	const paginatedProducts = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return filtered.slice(start, end);
	}, [filtered, currentPage, itemsPerPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedCategory, minRating, sortBy]);

	const isFavorite = (id) => favorites.has(id);

	const onToggleFavorite = (id) => {
		setFavorites((prev) => {
			const copy = new Set(prev);
			if (copy.has(id)) copy.delete(id);
			else copy.add(id);
			return copy;
		});
	};

	const [selectedProduct, setSelectedProduct] = useState(null);
	const openProduct = (p) => setSelectedProduct(p);
	const closeProduct = () => setSelectedProduct(null);

	if (loading) return <Loader />;
	if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;

	// Show favorites page
	if (showFavorites) {
		return (
			<div className="app-container">
				<Header 
					onFavoritesClick={() => setShowFavorites(false)}
					showBackButton={true}
				/>
				<FavoritesPage
					favorites={favorites}
					products={products}
					onToggleFavorite={onToggleFavorite}
					onBack={() => setShowFavorites(false)}
				/>
			</div>
		);
	}

	// Show main product listing
	return (
		<div className="app-container">
			<Header 
				onFavoritesClick={() => setShowFavorites(true)}
				showBackButton={false}
			/>
			<FilterBar
				categories={categories}
				selectedCategory={selectedCategory}
				onCategoryChange={setSelectedCategory}
				minRating={minRating}
				onMinRatingChange={setMinRating}
				sortBy={sortBy}
				onSortChange={setSortBy}
			/>

			<ProductGrid
				products={paginatedProducts}
				isFavorite={isFavorite}
				onToggleFavorite={onToggleFavorite}
				onOpenDetail={openProduct}
			/>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={setCurrentPage}
			/>
			<ProductDetail
				product={selectedProduct}
				onClose={closeProduct}
				onToggleFavorite={onToggleFavorite}
				isFavorite={isFavorite}
			/>
		</div>
	);
};

export default ProductListingPage;
