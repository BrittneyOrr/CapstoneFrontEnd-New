// MovieForm.jsx
import { useState } from 'react';

const MovieForm = ({ onMovieSubmit }) => {
    const [title, setTitle] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [category, setCategory] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [moviePlot, setMoviePlot] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const movieFormData = {
            poster_url: posterUrl,
            title: title,
            category: category,
            release_date: releaseDate,
            plot: moviePlot,
        };
        try {
            await onMovieSubmit(movieFormData);
            console.log(movieFormData);
            alert('Movie submitted successfully!');
            setTitle('');
            setPosterUrl('');
            setCategory('');
            setReleaseDate('');
            setMoviePlot('');
        } catch (error) {
            console.error('Error submitting movie:', error);
            alert('Failed to submit movie. Please try again later.');
        }
    };

    return (
        <fieldset className="MovieForm" style={{ backgroundColor: '#222', padding: '20px', marginTop: '20px', color: 'white' }}>
            <h5 style={{ color: 'white' }}>Submit a new movie:</h5>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Movie Title: </label>
                    <input type="text" value={title} placeholder='title' onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <p> </p>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Movie poster: </label>
                    <input type="url" value={posterUrl} placeholder='poster url' onChange={(e) => setPosterUrl(e.target.value)} required />
                </div>
                <p> </p>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Movie Category: </label>
                    <input type="text" value={category} placeholder='category' onChange={(e) => setCategory(e.target.value)} required />
                </div>
                <p> </p>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Release Date: </label>
                    <input type="text" value={releaseDate} placeholder='year-month-date' onChange={(e) => setReleaseDate(e.target.value)} required />
                </div>
                <p> </p>
                <div className="form-group">
                    <label style={{ color: 'white' }}>Plot: </label>
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