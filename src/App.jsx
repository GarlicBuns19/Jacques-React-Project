import {useEffect, useState} from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
// import './styles/custom.css';
import {Button} from "./components/Button.jsx";
import InputWrapper from "./components/InputWrapper.jsx";

function App() {

    const [loading, setLoading] = useState(false);
    const [joke, setJoke] = useState({});
    const [jokeDisplay, setJokeDisplay] = useState(false);
    const [jokeOption, setJokeOption] = useState('Programming');
    const getJoke = async () => {
        setLoading(true)
        setJokeDisplay(false)

        await fetch(`https://v2.jokeapi.dev/joke/${jokeOption}?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart`)
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

    // If user selects different joke option via select id = jokeType
    useEffect(() => {
        getJoke();
    }, [jokeOption]);

    return (
        <div className={"container p-4"}>
            <InputWrapper>
                <label htmlFor="jokeType">Choose Joke Type</label><br></br>
                <select name="jokeType" id="jokeType" value={jokeOption} onChange={(e) => setJokeOption(e.target.value)}>
                    <option value="Programming">Programming</option>
                    <option value="Dark">Dark</option>
                    <option value="Miscellaneous">Miscellaneous</option>
                    <option value="Christmas">Christmas</option>
                </select>
            </InputWrapper>

            {loading ? <div>Loading Joke</div> :
                joke.error ?
                    <>
                        <h2>Joke could not be displayed. Please try again.</h2>
                        <div><Button onClick={getJoke}>Try to get a joke again!</Button></div>
                    </>
                    : <>
                        {Object.keys(joke).length > 0 ?
                            <>
                                <h2>{joke.setup}</h2>
                                {jokeDisplay ?
                                    <div><h3>{joke.delivery}</h3></div> :
                                    <Button onClick={() => setJokeDisplay(true)}>Show the joke!</Button>}
                            </>
                            :
                            <h2>Joke could not be displayed. Please try again.</h2>}
                        <div>
                            <Button onClick={getJoke}>Get Joke!</Button>
                        </div>
                    </>
            }
        </div>
    )
}

export default App
