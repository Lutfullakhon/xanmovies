/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Error from '../error/error'
import useMovieService from '../services/movie-service'
import Spinner from '../spinner/spinner'
import './movie-info.scss'

const MovieInfo = ({ movieId }) => {
	const [movie, setMovie] = useState(null)

	const { getDetailedMovie, error, loading } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [movieId])

	// componentDidUpdate(prevProps) {
	// 	if (this.props.movieId !== prevProps.movieId) {
	// 		this.updateMovie()
	// 	}
	// }

	const updateMovie = () => {
		if (!movieId) {
			return
		}

		getDetailedMovie(movieId).then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(loading || error) ? <Content movie={movie} /> : null

	return (
		<div className='movieinfo'>
			{errorContent}
			{loadingContent}
			{content}
		</div>
	)
}

MovieInfo.propTypes = {
	movieId: PropTypes.number,
}

export default MovieInfo

const Content = ({ movie }) => {
	const navigate = useNavigate()
	return (
		<>
			<img src={movie.primaryImage} alt='img' />

			<div className='hero__movie-descr'>
				<h2>{movie.primaryTitle}</h2>
				<p>{movie.description}</p>
				<button
					className='btn btn-light'
					onClick={() => navigate(`/movie/${movie.id}`)}
				>
					Details
				</button>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
}
