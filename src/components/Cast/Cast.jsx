import { useState, useEffect } from "react";
import { alert } from "@pnotify/core";

import { getMovieCredits } from "../../api/api";

import s from "./Cast.module.css";

export default function Cast({ id }) {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    return getMovieCredits(id).then(setActors);
  }, [id]);

  return (
    <>
      {actors === [] &&
        alert({
          type: "error",
          text: "We have no information about the cast",
        })}
      <ul className={s.list}>
        {actors.map(
          (actor) =>
            actor.profile_path && (
              <li key={actor.id} className={s.item}>
                <img
                  className={s.image}
                  src={"https://image.tmdb.org/t/p/w300/" + actor.profile_path}
                  alt={actor.name}
                />
                <div className={s.title_box}>
                  <h2 className={s.title}>{actor.name}</h2>
                </div>
              </li>
            )
        )}
      </ul>
    </>
  );
}
