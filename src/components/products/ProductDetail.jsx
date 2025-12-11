import "./ProductDetail.css";

const ProductDetail = ({ product, onClose, onToggleFavorite, isFavorite }) => {
  if (!product) return null;

  return (
    <div className="pd-overlay" onClick={onClose}>
      <div className="pd-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <button className="pd-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="pd-body">
          <div className="pd-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="pd-info">
            <h2>{product.name}</h2>
            <p className="pd-category">{product.category}</p>
            <p className="pd-price">₹{product.price}</p>
            <p className="pd-rating">⭐ {product.rating}</p>
            <div className="pd-actions">
              <button onClick={() => onToggleFavorite(product.id)}>
                {isFavorite(product.id) ? 'Remove Favorite' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
