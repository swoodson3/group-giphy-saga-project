import { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function SearchView () {
    const [searchGif, searchGifUrl] = useState([]);
    const [capture, setCapture] = useState('');
    const history = useHistory();

    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = () => {
        axios.post('/search', {value: capture}).then(response => {
            console.log(response.data.data);
            searchGifUrl(response.data.data);
            typeof(searchGif);
        }).catch(error => {
            console.log(error);
            alert('Something went wrong!')
        })
    }

    console.log(capture);

    const addToFavorites = (id) => {
        console.log(id);
    }

    const goToFavoritesList = () => {
        history.push(`/favorites`)
    }

    return (
        <>
        <form>
            <input type="text"
                   onChange={() => setCapture(event.target.value)}
            />
        </form>
        <button onClick={handleSearch}>Search</button>
        <button onClick={goToFavoritesList}>Favorites</button>
        {searchGif.map(gif => (
            
            <div key={gif.id}>
                <img src={gif.images.downsized.url}/>
                <br />
                <button onClick={() => addToFavorites(gif.id)}>Add To Favorites</button>
            </div>
        ))}
        </>
    );
}

export default SearchView;