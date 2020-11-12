import React,{useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialMovieValues = {
    title: '',
    director: '',
    metascore: '',
    stars: [],
    id: ''
}


const Update = (props) =>{

    const {setMovies, movieList} = props
    const {push} = useHistory()
    const {id} = useParams()
    const [movieValues, setMovieValues] = useState(initialMovieValues)

    //event handlers
    const handleChange = (event)=>{
        setMovieValues({
            ...movieValues,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault()
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movieValues)
        .then(response=>{
            props.setMovieValues([
                ...props.movieList, response.data
            ])
            push(`/api/movies/${id}`)
        })
        .catch(error=>{
            console.log('THIS IS YOUR ERROR', error)
        })
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                placeholder='Enter Movie Title'
                value={movieValues.title}
                onChange={handleChange}
                />
                <input
                type='text'
                name='director'
                placeholder='Enter the Movie Director'
                value={movieValues.director}
                onChange={handleChange}
                />
                <input
                type='text'
                name='metascore'
                placeholder='Enter the Movie MetaScore'
                value={movieValues.metascore}
                onChange={handleChange}
                />
                <input
                type='text'
                name='stars'
                placeholder='Enter the Movie Stars'
                value={movieValues.stars}
                onChange={handleChange}
                />
            </form>
            <button onSubmit={handleSubmit}>Update</button>
        </div>
    )

}

export default Update