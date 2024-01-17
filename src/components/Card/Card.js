
function Card({title, urlToShorten }){
    return (
        <div className='card'>
            <h3>{title}</h3>
            <p>{urlToShorten}</p>
            <button>Delete</button>
        </div>
    )
}

export default Card;