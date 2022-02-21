import Link from "next/link";
import React from "react";

const Pagination = ({ page, total, perPage }: any) => {
  const lastPage = Math.ceil(total / perPage);
  return (
    <>
      {page > 1 && (
        <Link href={`events?page=${page - 1}`}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}

      {page < lastPage && (
        <Link href={`events?page=${page + 1}`}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  );
};

export default Pagination;
