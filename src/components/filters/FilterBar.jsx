import "./FilterBar.css";

const FilterBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  minRating,
  onMinRatingChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Min Rating</label>
        <select
          value={minRating}
          onChange={(e) => onMinRatingChange(Number(e.target.value))}
        >
          <option value={0}>All</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Sort by Price</label>
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="none">None</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
