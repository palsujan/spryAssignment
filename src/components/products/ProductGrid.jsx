import "./ProductGrid.css";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, isFavorite, onToggleFavorite, onOpenDetail }) => {
  if (!products.length) {
    return (
      <p className="empty-state">No products match the current filters.</p>
    );
  }

  return (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          isFavorite={isFavorite(p.id)}
          onToggleFavorite={onToggleFavorite}
          onOpenDetail={onOpenDetail}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
