import {useEffect, useState} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from "./components/Button.jsx";
function App() {

    const [loading, setLoading] = useState(false);
    const [joke, setJoke] = useState({});
    const getJoke = async () => {

        setLoading(true)

        await fetch("https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart")
            .then(res => res.json())
            .then(data => setJoke(data))
            .catch(e => {
                console.log(e)
            })
            .finally(() => {
                setLoading(false)
            });
    };

    useEffect(() => {
        getJoke();
    }, []);

    if (loading) {
        return (
            <div>
                Loading Joke
            </div>
        )
    }

    return (
        <div className={'wrapper'}>
            {Object.keys(joke).length > 0 ?
                <>
                    <h1>{joke.setup}</h1>
                    <div>{joke.delivery}</div>
                </>
                : null}
            <Button onClick={getJoke}>Get Joke!</Button>
        </div>
    )
}

export default App
