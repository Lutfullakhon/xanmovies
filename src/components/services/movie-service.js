import { useHttp } from '../../hooks/use-http'

const useMovieService = () => {
	const { request, loading, error, clearError } = useHttp()

	const _apiBase = 'https://imdb236.p.rapidapi.com/api/imdb'
	const _apiKey =
		'rapidapi-key=7e6c133cecmshb9177686db1f342p19cd31jsnfc75a5de066d'

	const getPopularMovies = async () => {
		const response = await request(`${_apiBase}/most-popular-movies?${_apiKey}`)
		const movies = response

		return movies && movies.map(movie => _transformMovie(movie))
	}

	const getTrandingMovies = async () => {
		const response = await request(`${_apiBase}/top250-movies?${_apiKey}`)
		const movies = response

		return movies && movies.map(movie => _transformMovie(movie))
	}

	const getDetailedMovie = async id => {
		return request(`${_apiBase}/tt${id}?${_apiKey}`)

		// return _transformMovie(movie)
	}

	const getRandomMovie = async () => {
		const res = await getPopularMovies()
		const movie = res[Math.floor(Math.random() * res.length)]
		return movie
	}

	const _transformMovie = movie => {
		return {
			name: movie.originalTitle,
			description: movie.description,
			thumbnail: movie.primaryImage,
			id: movie.id,
			releaseDate: movie.releaseDate,
			averageRating: movie.averageRating,
			runtimeMinutes: movie.runtimeMinutes,
		}
	}

	return {
		getTrandingMovies,
		getDetailedMovie,
		getRandomMovie,
		getPopularMovies,
		loading,
		error,
		clearError,
	}
}

export default useMovieService
