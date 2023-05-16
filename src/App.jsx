import {useEffect, useState} from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
// import './styles/custom.css';
import {Button, HoverBtn} from "./components/Button.jsx";
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
        <div className={"grid place-content-center bg-slate-900 min-h-screen text-white"}>
            <div className={"w-96"}>
                <InputWrapper>
                    <label htmlFor="jokeType">Choose Joke Type</label>
                    <select name="jokeType" id="jokeType" className={"w-80 bg-slate-900"} value={jokeOption}
                            onChange={(e) => setJokeOption(e.target.value)}>
                        <option value="Programming">Programming</option>
                        <option value="Dark">Dark</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                        <option value="Christmas">Christmas</option>
                    </select>
                </InputWrapper>

                {loading ? <div>Loading Joke</div> :
                    joke.error ?
                        <div>
                            <h2>Joke could not be displayed. Please try again.</h2>
                            <div><HoverBtn onClick={getJoke}>Try to get a joke again!</HoverBtn></div>
                        </div>
                        : <div>
                            {Object.keys(joke).length > 0 ?
                                <>
                                    <h2 className={"text-lg py-2"}>{joke.setup}</h2>
                                    {jokeDisplay ?
                                        <div><h3 className={"text-xl text-sky-400 py-2"}>{joke.delivery}</h3></div> :
                                        // <Button className={"hover:bg-slate-800 ease-in duration-300"}
                                        //         onClick={() => setJokeDisplay(true)}>Show the joke!</Button>}
                                    <HoverBtn onClick={() => setJokeDisplay(true)}>Show the joke!</HoverBtn>}
                                </>
                                :
                                <h2>Joke could not be displayed. Please try again.</h2>}
                            <div>
                                <HoverBtn onClick={getJoke}>Get Joke!</HoverBtn>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

export default App
