/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'
import { useLocation } from 'react-router-dom'
import Error from '../error/error'
import MovieInfo from '../movie-info/movie-info'
import RowMoviesItem from '../row-movies-item/row-movies-item'
import useMovieService from '../services/movie-service'
import Spinner from '../spinner/spinner'
import './row-movies.scss'

const RowMovies = () => {
	const [newItemLoading, setNewItemLoading] = useState(false)
	const [open, setOpen] = useState(false)
	const [allMovies, setAllMovies] = useState([])
	const [displayedMovies, setDisplayedMovies] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [movieId, setMovieId] = useState(null)

	const { pathname } = useLocation()

	const { getTrandingMovies, getPopularMovies, loading, error } =
		useMovieService()

	useEffect(() => {
		getMovies()
	}, [])

	useEffect(() => {
		if (currentIndex >= allMovies.length) {
			setNewItemLoading(true)
		}
	}, [currentIndex, allMovies.length])

	const onClose = () => setOpen(false)

	const onOpen = id => {
		const converterId = String(id).slice(2)
		const intMovieId = parseInt(converterId, 10)
		const formattedId = intMovieId.toString().padStart(converterId.length, '0')

		setMovieId(formattedId)
		setOpen(true)
	}

	const getMovies = () => {
		// setNewItemLoading(true)
		if (pathname === '/popular') {
			getPopularMovies()
				.then(res => {
					setAllMovies(res)
					setDisplayedMovies(res.slice(0, 50))
					setCurrentIndex(50)
				})
				.finally(() => setNewItemLoading(false))
		} else {
			getTrandingMovies()
				.then(res => {
					setAllMovies(res)
					setDisplayedMovies(res.slice(0, 50))
					setCurrentIndex(50)
				})
				.finally(() => setNewItemLoading(false))
		}
	}

	// getTrendingMovies = () => {
	// 	this.movieService
	// 		.getTrendingMovies()
	// 		.then(res => {
	// 			this.setState({
	// 				allMovies: res,
	// 				displayedMovies: res.slice(0, 50),
	// 				currentIndex: 50,
	// 			})
	// 		})
	// 		.catch(() => this.setState({ error: true }))
	// 		.finally(() => this.setState({ loading: false, newItemLoading: false }))
	// }

	const loadMoreMovies = () => {
		const nextMovies = allMovies.slice(currentIndex, currentIndex + 50)

		setDisplayedMovies(prevDisplayedMovies => [
			...prevDisplayedMovies,
			...nextMovies,
		])
		setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 50)
	}

	const errorContent = error ? <Error /> : null
	const loadingContent = loading ? <Spinner /> : null

	return (
		<div className='rowmovies'>
			<div className='rowmovies__top'>
				<div className='rowmovies__top-title'>
					<img src='/tranding.svg' alt='' />
					<h1>{pathname === '/popular' ? 'Popular' : 'Tranding'}</h1>
				</div>
				<div className='hr' />
				<a href='#'>See more</a>
			</div>

			{errorContent}
			{loadingContent}
			<Content displayedMovies={displayedMovies} onOpen={onOpen} />

			<div className='rowmovies__loadmore'>
				<button
					className='btn btn-secondary'
					onClick={loadMoreMovies}
					disabled={newItemLoading}
				>
					Load More
				</button>
			</div>

			<Modal open={open} onClose={onClose}>
				<MovieInfo movieId={movieId} />
			</Modal>
		</div>
	)
}

export default RowMovies

const Content = ({ displayedMovies, onOpen }) => {
	return (
		<div className='rowmovies__lists'>
			{displayedMovies.map(movie => (
				<RowMoviesItem key={movie.id} movie={movie} onOpen={onOpen} />
			))}
		</div>
	)
}

Content.propTypes = {
	displayedMovies: PropTypes.array,
	onOpen: PropTypes.func,
}
