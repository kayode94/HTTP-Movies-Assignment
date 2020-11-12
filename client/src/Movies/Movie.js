import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, props}) {
  const [movie, setMovie] = useState(null);
  const {push} = useHistory()
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = () =>{
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(response=>{
      console.log(response.data)
      push('/')
    })
    .catch(error=>{
      console.log('THIS IS YOUR ERROR', error)
    })
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <Link to ={`/update-movie/${params.id}`}>
        <button>Update</button>
      </Link>
      <button onClick={handleDelete}>Delete a Movie</button>
    </div>
  );
}

export default Movie;
