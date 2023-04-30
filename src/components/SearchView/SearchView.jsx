import { useState, useEffect } from 'react';
import axios from 'axios'

function SearchView () {
    const [searchGif, searchGifUrl] = useState('');

    useEffect(() => {
        axios.get('/search').then(response => {
            console.log(response.data);
            searchGifUrl(response.data.data.images.downsized_medium.url);
        }).catch(error => {
            console.log(error);
            alert('Something went wrong!')
        })
    }, []);

    return (
        <>
        <input />
        {/* <img src={searchGif} /> */}
        </>
    );
}

export default SearchView;