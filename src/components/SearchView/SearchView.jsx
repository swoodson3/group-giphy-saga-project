import { useState, useEffect } from 'react';
import axios from 'axios'

function SearchView () {
    const [searchGif, searchGifUrl] = useState([]);
    const [capture, setCapture] = useState('');

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

    return (
        <>
        <form>
            <input type="text"
                   onChange={() => setCapture(event.target.value)}
            />
        </form>
        <button onClick={handleSearch}>Search</button>
        {searchGif.map(gif => (
            
            <div key={gif.id}>
                <img src={gif.images.downsized.url}/>
            </div>
        ))}
        </>
    );
}

export default SearchView;