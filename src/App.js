import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import NewMovieForm from './components/NewMovieForm';

import './App.css';

// movies list

const films = [
  {
    id: 1,
    title: 'Her',
    description:
      'Depressed because of his impending divorce from his childhood sweetheart Catherine, Theodore purchases an operating system upgrade that includes a virtual assistant with artificial intelligence.',
    posterURL: "https://m.media-amazon.com/images/I/41Eb7WxmYNL._AC_.jpg",
    rating: 8.7,
    status: 'Released'
  },
  {
    id: 2,
    title: 'El camino',
    description:
      'It continues the story of Jesse Pinkman, who partnered with former teacher Walter White throughout the series to build a crystal meth empire based in Albuquerque.',
    posterURL: 'https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUyN2U2ZTc0NmM5XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_.jpg',
    rating: 7.9,
    status: 'Released'
  },
  {
    id: 3,
    title: 'Ozark',
    description:
      'A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a drug boss..',
    posterURL: 'https://resizing.flixster.com/pMyRj7F9A0YdUaKBPszm8-BNkeA=/ems.cHJkLWVtcy1hc3NldHMvdHZzZWFzb24vUlRUVjY4ODQ0OC53ZWJw',
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
