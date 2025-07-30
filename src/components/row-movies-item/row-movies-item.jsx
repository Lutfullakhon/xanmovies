import PropTypes from 'prop-types'
import './row-movies-item.scss'

const RowMoviesItem = ({ movie, onOpen }) => {
	return (
		<div className='movieitem' onClick={() => onOpen(movie.id)}>
			<img src={movie.thumbnail} alt={movie.title} />

			<h2>
				{movie.name.length > 15 ? `${movie.name.slice(0, 15)}...` : movie.name}
			</h2>
			<div className='movieitem-descr'>
				<img src='/date.svg' alt='' />
				<p>{movie.releaseDate}</p>
				<img src='/star.svg' alt='' />
				<p>{movie.averageRating} </p>
				<div className='dot'></div>
				<p>{movie.runtimeMinutes}-m</p>
			</div>
		</div>
	)
}

RowMoviesItem.propTypes = {
	movie: PropTypes.object,
	onOpen: PropTypes.func,
}

export default RowMoviesItem
