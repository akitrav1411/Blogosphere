import classes from "./Pagination.module.css";
export const Pagination = (props) => {
  const { pageIndex, handlePageIndex, pages } = props;

  return (
    <div className={`${classes["handle-btns"]}`}>
      <button
        disabled={pageIndex <= 1}
        className={pageIndex > 1 ? classes.enabled : ""}
        onClick={() => handlePageIndex(-1)}
      >
        Previous
      </button>
      <p>{pageIndex}</p>
      <button
        className={pageIndex < pages ? classes.enabled : ""}
        disabled={pageIndex >= pages}
        onClick={() => handlePageIndex(+1)}
      >
        Next
      </button>
    </div>
  );
};
