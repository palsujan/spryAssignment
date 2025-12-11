import "./ErrorState.css";

const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <p>{message || "Something went wrong."}</p>
      {onRetry && (
        <button className="error-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;
