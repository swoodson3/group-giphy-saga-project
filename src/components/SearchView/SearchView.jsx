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

    const addToFavorites = (id, image_url, user_id, category_id) => {
        axios.post(`/api/favorite`, {
            // user_id,
            id,
            image_url,
            category_id: id,
        }).then((response) => {
            console.log(id);
            console.log(image_url);
            console.log(category_id);
            console.log(user_id);
        })

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
                <button onClick={() => addToFavorites(gif.id, gif.image_url, gif.categery_id)}>Add To Favorites</button>
            </div>
        ))}
        </>
    );
}

export default SearchView;