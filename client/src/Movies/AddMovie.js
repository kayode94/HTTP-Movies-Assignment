import React,{useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore:'',
    stars: ''
}

const AddMovie = (props) =>{
    const {movieList, setMovieList} = props
    const {push} = useHistory()
    const {id} = useParams()
    const [movie, setMovie] = useState(initialMovie)

    const handleChange = (event)=>{
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        axios.post(`http://localhost:5000/api/movies`, movie)
        .then(response=>{
            setMovieList([...movieList, response.data])
            setMovie(initialMovie)
            push(`/movies/`)
        })
        .catch(error=>{
            console.log('THIS IS YOUR ERROR', error)
        })
    }

    return (
        <div>
            <h3>Add your favorite movie!</h3>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='Enter a movie'
                value={movie.title}
                />
                <input
                type='text'
                name='director'
                onChange={handleChange}
                placeholder='Enter a movie director'
                value={movie.director}
                />
                <input
                type='text'
                name='stars'
                onChange={handleChange}
                placeholder='Enter a movie star'
                value={movie.stars}
                />
                <input
                type='text'
                name='metascore'
                onChange={handleChange}
                placeholder='Enter a movie metascore'
                value={movie.metascore}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie