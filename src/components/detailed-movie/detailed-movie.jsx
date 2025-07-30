/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Error from '../error/error'
import useMovieService from '../services/movie-service'
import Spinner from '../spinner/spinner'
import './detailed-movie.scss'

const DetailedMovie = () => {
	const [movie, setMovie] = useState(null)

	const { movieId } = useParams()
	const converterId = String(movieId).slice(2)
	const intMovieId = parseInt(converterId, 10)
	const formattedId = intMovieId.toString().padStart(converterId.length, '0')

	const { getDetailedMovie, error, loading } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [formattedId])

	const updateMovie = () => {
		if (!formattedId) {
			return
		}

		getDetailedMovie(formattedId).then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(loading || error) ? <Content movie={movie} /> : null

	return (
		<>
			{errorContent}
			{loadingContent}
			{content}
		</>
	)
}

export default DetailedMovie

const Content = ({ movie }) => {
	return (
		<div className='detailedmovie'>
			<div className='detailedmovie__image'>
				<img src={movie.primaryImage} alt={movie.name} />
			</div>

			<div className='detailedmovie-descr'>
				<h1>{movie.name}</h1>
				<p>{movie.description}</p>
				<div className='detailedmovie__descr-info'>
					<img src='/date.svg' alt='' />
					<p>{movie.release_date}</p>
					<div className='dot' />
					<p>{movie.releaseDate} </p>
					<img src='/star.svg' alt='' />
					<p>{movie.runtimeMinutes}-m</p>
				</div>
			</div>
		</div>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
}
