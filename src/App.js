import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import NewMovieForm from './components/NewMovieForm';

import './App.css';

// movies list

const films = [
  {
    id: 1,
    title: 'The Matrix',
    description:
      'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    posterURL: "https://th.bing.com/th/id/OIP.mCr3x90hubrByxx2xp21EwHaLH?w=201&h=302&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    rating: 8.7,
    status: 'Released'
  },
  {
    id: 2,
    title: 'Jurassic Park',
    description:
      'A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
    posterURL: 'https://th.bing.com/th/id/R.9f707fb87a8d2c04301b5de3c8f4a8ae?rik=dBYDE2Y7QfVvpw&pid=ImgRaw&r=0',
    rating: 7.9,
    status: 'Released'
  },
  {
    id: 3,
    title: 'Star Wars: Episode IV - A New Hope',
    description:
      'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
    posterURL: 'https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/81aA7hEEykL._AC_UF1000,1000_QL80_.jpg',
    rating: 8.6,
    status: 'Released'
  }
]

const App = () => {
  const [movies, setMovies] = useState(films);
  const [titleFilter, setTitleFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    if (storedMovies) {
      setMovies(storedMovies);
    }
  }, []);

  const handleAddMovie = (movie) => {
    setMovies([...movies, movie]);
    localStorage.setItem('movies', JSON.stringify([...movies, movie]));
  };

  useEffect(() => {
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  return (
    <div className="app">
     
      <div className="center_position">
        <Filter
        onFilter={({ title, rating }) => {
          setTitleFilter(title);
          setRatingFilter(rating);
        }}
      />
      </div>
      <MovieList
        movies={movies.filter((movie) => {
          return (
            movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
            movie.rating >= ratingFilter
            );
          })}
      />
          < NewMovieForm onAddMovie={handleAddMovie} />
    </div>
  );
};

export default App;
