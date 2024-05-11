// MovieForm.jsx
import { useState } from 'react';

const MovieForm = ({ onMovieSubmit }) => {
    const [movieTitle, setMovieTitle] = useState('');
    const [category, setCategory] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [moviePlot, setMoviePlot] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit review data to backend
        const MovieFormData = {
            movie_id: Number(movieId),
            movieTitle: moviePlot.title,
            category: movie.category,
            releaseDate: movie.releaseDate,
            moviePlot: movie.plot,
        };
        try {
            // Call function to submit review data to server
            await onMovieSubmit(MovieFormData);
            console.log(MovieFormData);
            alert('Movie submitted successfully!');
            // Clear form fields after submission
            setMovieTitle('');
            setCategory('');
            setReleaseDate('');
            setMoviePlot('');
        } catch (error) {
            // Handle errors if submission fails
            console.error('Error submitting movie:', error);
            // Display an error message to the user
            alert('Failed to submit movie. Please try again later.');
        }
    };

    return (
        <fieldset className="MovieForm" style={{ backgroundColor: '#222', padding: '20px', marginTop: '20px', color: 'white' }}>
            <h5 style={{ color: 'white' }}>Submit a new movie:</h5>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Movie Title:</label>
                    <input type="text" value={movieTitle} onChange={(e) => setMovieTitle(e.target.value)} required />
                </div>
                <p> </p>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Movie Category:</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <p> </p>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Release Date:</label>
                    <input type="text" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
                </div>
                <p> </p>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Plot:</label>
                    <textarea 
                        value={moviePlot} 
                        onChange={(e) => setMoviePlot(e.target.value)} 
                        className="form-control" 
                        rows="3" 
                        placeholder="What is the movie's plot?" 
                        style={{ marginBottom: '10px', width: '100%' }} 
                        required 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit Movie</button>
            </form>
        </fieldset>
    );
};

export default MovieForm;