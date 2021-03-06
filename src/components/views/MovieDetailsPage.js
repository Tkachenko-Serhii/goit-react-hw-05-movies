import { useState, useEffect, lazy, Suspense } from "react";
import {
  Link,
  Route,
  useParams,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { alert } from "@pnotify/core";

import { getMovieDetails } from "../../api/api";
import Loader from "../Loader";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast" /* webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import("../Reviews" /* webpackChunkName: "reviews" */)
);

export default function MovieDetailsPage() {
  const location = useLocation();
  const navigation = useNavigate();
  const { id } = useParams();
  const [filmDetails, setFilmDetails] = useState([]);

  useEffect(() => {
    return getMovieDetails(id).then(setFilmDetails);
  }, [id]);

  const onClickBack = () => {
    const { from } = location.state;
    navigation(from);
  };

  return (
    <>
      {filmDetails === [] &&
        alert({
          type: "error",
          text: `No films for request`,
        })}

      <button type='button' className={s.button} onClick={onClickBack}></button>

      <div className={s.container}>
        <div className={s.movie_img}>
          {filmDetails.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${filmDetails.poster_path}`}
              alt={filmDetails.original_title}
            />
          ) : (
            <img
              src='https://bookslibs.info/assets/general/images/no_poster.jpg'
              alt={filmDetails.original_title}
            />
          )}
        </div>
        <div>
          <div className={s.description}>
            <h2 className={s.title}>{filmDetails.original_title}</h2>
            <h3 className={s.title__mod}>Overview</h3>
            <p className={s.overviev}>{filmDetails.overview}</p>
            <h3 className={s.title__mod}>Genres</h3>
            <ul className={s.list}>
              {filmDetails.genres?.map(
                (genre) =>
                  filmDetails.genres && (
                    <li className={s.item} key={genre.id}>
                      <p>{genre.name}</p>
                    </li>
                  )
              )}
            </ul>
          </div>
          <ul className={s.list}>
            <li key={0} className={s.list__item}>
              <Link
                to={{
                  pathname: "cast",
                }}
                state={location.state}
              >
                <button type='button' className={s.link}>
                  Cast
                </button>
              </Link>
            </li>
            <li key={1} className={s.list__item}>
              <Link
                to={{
                  pathname: "reviews",
                }}
                state={location.state}
              >
                <button type='button' className={s.link}>
                  Reviews
                </button>
              </Link>
            </li>
          </ul>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='cast' element={<Cast id={id} />} />
              <Route path='reviews' element={<Reviews id={id} />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
}
