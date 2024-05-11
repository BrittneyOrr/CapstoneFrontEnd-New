// MovieFormManager.jsx

import React, { useState, useEffect } from 'react';
import { getAllMovies, submitMovie } from '../api';
import MovieForm from './MovieForm';

const MovieFormManager = ({}) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const initialMovies = await getAllMovies();
                setMovies(initialMovies);
                console.log({initialMovies});
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchMovies();
    }, []);

    const handleMovieSubmit = async (movieFormData) => {
        try {
            await submitMovie(movieFormData);
            const updatedMovies = await getAllMovies();
            setMovies(updatedMovies);
            console.log({updatedMovies});
        } catch (error) {
            console.error('Error submitting movie:', error);
            // Handle error
        }
    };

    return (
        <div>
            {<MovieForm onMovieSubmit={handleMovieSubmit} />}
        </div>
    );
};

export default MovieFormManager;
