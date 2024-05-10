// setup the API CRUD to pull movies
//DO WE NEED TO DEPLOY TO GET OUR BASE URL?
// const API_URL = "https://localhost:5432";

// index.js
export const getAllMovies = async () => {
    try {
        const result = await fetch('https://capstoneprojectbackend-ywy6.onrender.com/api/movies');
        if (!result.ok) {
            throw new Error('Failed to fetch movies');
        }
        const response = await result.json();
        console.log(response);
        return response;
    } catch(error) {
        console.error('Error fetching movies:', error); // Log error
        throw error; // Re-throw the error to propagate it further
    }
};
export const login = async (username, password) => {
try{
    const response = await fetch('https://capstoneprojectbackend-ywy6.onrender.com/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    
                })
            });
            return response.json();

}catch(err){
    console.log(err);
}

}

    // export const getAllMovies = async () => {
    //     try {
    //         const result = { 
    //             titles: ["Dune", "Dune: Part Two"],
    //             category: "Science fiction",
    //             releaseDates: ["2021-10-22", "2024-01-03"], // Changed release dates to strings
    //             posterUrls: ["https://www.themoviedb.org/t/p/w1280/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", "https://www.themoviedb.org/t/p/w1280/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"],
    //             plots: [
    //                 "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.",
    //                 "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice"
    //             ],
    //         };
    
    //         const movies = result.titles.map((title, index) => ({
    //             id: index + 1, // You can generate IDs based on array index
    //             title,
    //             category: result.category,
    //             releaseDate: result.releaseDates[index],
    //             imageUrl: result.posterUrls[index],
    //             plot: result.plots[index]
    //         }));
    
    //         return movies;
    //     } catch(error) {
    //         console.log(error);
    //         throw new Error("Failed to fetch movies");
    //     }
    // };

    export const fetchMovie = async (movieId) => {
        try {
            const result = await fetch(`https://capstoneprojectbackend-ywy6.onrender.com/api/movies/${movieId}`);
            if (!result.ok) {
                throw new Error('Failed to fetch movie');
            }
            const movieData = await result.json();
            return movieData; // Assuming the response contains the entire movie object
        } catch (error) {
            console.error("Failed to fetch movie:", error);
            throw new Error("Failed to fetch movie");
        }     
     };
     
    
    export const fetchMovieReviews = async (movieId) => {
        try {
            const result = await fetch(`https://capstoneprojectbackend-ywy6.onrender.com/api/reviews/movies/${movieId}`);
            if (!result.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const reviews = await result.json();
           
            return reviews;
        } catch (error) {
            console.error('Error fetching reviews', error);
            throw new Error("Failed to fetch reviews");
        }
    }

    export const fetchUserReviews = async (userId) => {
        try {
            const result = await fetch(`https://capstoneprojectbackend-ywy6.onrender.com/api/reviews/users/${userId}`);
            if (!result.ok) {
                throw new Error(`Failed to fetch user reviews: ${result.status} ${result.statusText}`);
            }
            const response = await result.json();
            return response;
        } catch (error) {
            console.error('Error fetching user reviews:', error);
            throw new Error('Failed to fetch user reviews');
        }
    };
    
    

    // export const fetchComments = async () => {
    //     try {
    //         const result = await fetch('/api/comments');
    //         if (!result.ok) {
    //             throw new Error('Failed to fetch comments');
    //         }
    //         const response = await result.json();
    //         return response.comments;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error("Failed to fetch comments");
    //     }
    // }

    // export const fetchComment = async (id) => {
    //     try {
    //         const result = await fetch(`/api/comments/${id}`);
    //         if (!result.ok) {
    //             throw new Error('Failed to fetch comment');
    //         }
    //         const response = await result.json();
    //         return response.comment;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error("Failed to fetch comment");
    //     }
    // }

    export async function register(userData) {
        try {
            const response = await fetch('https://capstoneprojectbackend-ywy6.onrender.com/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to register');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    export const submitReview = async (reviewData) => {
        try {
                // await fetch('https://localhost:3000/api/reviews', {
        //     // Example: Make an API request to submit review data to the server


            const response = await fetch('https://capstoneprojectbackend-ywy6.onrender.com/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reviewData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    // export const deleteMovieById = async (movieId) => {
    //     console.log(movieId);
    //     // try {
    //     //     if (!isadmin) {
    //     //         throw new Error('User is not authorized to delete movies');
    //     //     }
    
    //         const response = await fetch(`https://capstoneprojectbackend-ywy6.onrender.com/api/movies/${movieId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'Authorization': `Bearer ${token}`
    //             },
    //             body: JSON.stringify()
    //         });
    //         console.log(response);
    
    //         if (!response.ok) {
    //             throw new Error('Failed to delete movie');
    //         }
    
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         throw new Error(error.message);
    //     }
    // };

    export const deleteMovieById = async (movieId) => {
        try {
            const response = await fetch(`https://capstoneprojectbackend-ywy6.onrender.com/api/movies/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete movie');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    export const fetchUserInfo = async (userId) => {
        try {
          const result = await fetch(`https://capstoneprojectbackend-ywy6.onrender.com/api/users/${userId}`);
          if (!result.ok) {
            throw new Error('Failed to fetch user information');
          }
          const userInfo = await result.json();
          return userInfo;
        } catch (error) {
          console.error('Failed to fetch user information:', error);
          throw new Error('Failed to fetch user information');
        }
      };
      

