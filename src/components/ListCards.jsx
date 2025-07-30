import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWatchlist, removeFromWatchlist } from "../store/slicers/watchlistSlice";
import { useNavigate } from "react-router-dom";

function ListCard({ movies = [], type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies: watchlistMovies, tvShows: watchlistTvShows } = useSelector((state) => state.watchlist);
  const { isAuthenticated } = useSelector((state) => state.user);

  const isInWatchlist = (id) => {
    return type === 'movie'
      ? watchlistMovies.some(movie => movie.id === id)
      : watchlistTvShows.some(show => show.id === id);
  };

  const handleWatchlistToggle = (movie) => {
    if (isInWatchlist(movie.id)) {
      dispatch(removeFromWatchlist({ id: movie.id, type }));
    } else {
      dispatch(addToWatchlist({ item: movie, type }));
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 12;
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  if (!movies || movies.length === 0) {
    return <p className="text-center mt-5">No movies available.</p>;
  }

  return (
    <>
      <div className="row">
        {currentMovies.map((movie) => (
          <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div
                className="position-relative"
                onClick={() => navigate(`/movie/Details/${movie.id}`, { state: { type } })}
                style={{ cursor: "pointer", height: "280px", overflow: "hidden" }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/220x320?text=No+Image"
                  }
                  className="card-img-top h-100"
                  alt={type === "movie" ? movie.title : movie.name}
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="card-body d-flex flex-column justify-content-between p-2">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="card-title text-truncate mb-0" title={type === "movie" ? movie.title : movie.name}>
                    {type === "movie" ? movie.title : movie.name}
                  </h6>
                  <small className="text-muted">
                    {movie.vote_average?.toFixed(1) || "N/A"} ⭐
                  </small>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    {type === "movie" ? movie.release_date : movie.first_air_date}
                  </small>
                  {isAuthenticated && (
                    <button
                      className={`btn btn-sm ${isInWatchlist(movie.id) ? 'btn-danger' : 'btn-outline-danger'}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWatchlistToggle(movie);
                      }}
                    >
                      <i className={`bi bi-heart${isInWatchlist(movie.id) ? "-fill" : ""}`}></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
              </li>

              {(() => {
                const pageNumbers = [];
                const maxVisiblePages = 5;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                let endPage = startPage + maxVisiblePages - 1;

                if (endPage > totalPages) {
                  endPage = totalPages;
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }

                if (startPage > 1) {
                  pageNumbers.push("...");
                }

                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(i);
                }

                if (endPage < totalPages) {
                  pageNumbers.push("...");
                }

                return pageNumbers.map((page, index) => (
                  <li key={index} className={`page-item ${page === currentPage ? "active" : ""} ${page === "..." ? "disabled" : ""}`}>
                    {page === "..." ? (
                      <span className="page-link">…</span>
                    ) : (
                      <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                    )}
                  </li>
                ));
              })()}

              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}

export default ListCard;
