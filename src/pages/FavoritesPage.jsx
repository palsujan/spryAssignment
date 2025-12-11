import { useMemo, useState } from "react";
import ProductGrid from "../components/products/ProductGrid";
import ProductDetail from "../components/products/ProductDetail";
import "../styles/App.css";

const FavoritesPage = ({ favorites, products, onToggleFavorite, onBack }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const favoriteProducts = useMemo(() => {
    return products.filter((p) => favorites.has(p.id));
  }, [products, favorites]);

  const isFavorite = (id) => favorites.has(id);

  const openProduct = (p) => setSelectedProduct(p);
  const closeProduct = () => setSelectedProduct(null);

  return (
    <>
      <div style={{ padding: "1rem 0", borderBottom: "1px solid #e0e0e0" }}>
        <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>
          My Favorites ({favoriteProducts.length})
        </h2>
      </div>

      {favoriteProducts.length === 0 ? (
        <p style={{ textAlign: "center", padding: "2rem 1rem", color: "#666" }}>
          No favorites yet. Start adding products to see them here!
        </p>
      ) : (
        <ProductGrid
          products={favoriteProducts}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
          onOpenDetail={openProduct}
        />
      )}

      <ProductDetail
        product={selectedProduct}
        onClose={closeProduct}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />
    </>
  );
};

export default FavoritesPage;
