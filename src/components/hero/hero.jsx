/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Error from '../error/error'
import useMovieService from '../services/movie-service'
import Spinner from '../spinner/spinner'
import './hero.scss'

const Hero = () => {
	const [movie, setMovie] = useState(null)

	const { getRandomMovie, error, loading, clearError } = useMovieService()

	useEffect(() => {
		updateMovie()
	}, [])

	const updateMovie = () => {
		clearError()
		getRandomMovie().then(res => setMovie(res))
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null
	const content = !(loading || error || !movie) ? (
		<Content movie={movie} />
	) : null

	return (
		<div className='hero'>
			<div className='hero__info'>
				<h2>FIND MOVIES</h2>
				<h1>TV SHOWS and more</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore
					quis illo, aliquam alias libero sequi itaque odit voluptas. Alias
					nihil laboriosam, accusantium officia delectus, inventore
					reprehenderit aut dolorum, error voluptatem nulla eveniet fugiat
					architecto dolor.
				</p>
				<div>
					<button className='btn btn-secondary' onClick={updateMovie}>
						Random Movie
					</button>
				</div>
			</div>
			<div className='hero__movie'>
				{errorContent}
				{loadingContent}
				{content}
			</div>
		</div>
	)
}

export default Hero

const Content = ({ movie }) => {
	const navigate = useNavigate()

	return (
		<>
			<img src={movie.thumbnail} alt='img' />

			<div className='hero__movie-descr'>
				<h2>{movie.name}</h2>
				<p>
					{movie.description && movie.description.length >= 250
						? `${movie.description.slice(0, 250)}...`
						: movie.description}
				</p>
				<button
					className='btn btn-primary'
					onClick={() => navigate(`/movie/${movie.id}`)}
				>
					Detalis
				</button>
			</div>
		</>
	)
}

Content.propTypes = {
	movie: PropTypes.object,
}
