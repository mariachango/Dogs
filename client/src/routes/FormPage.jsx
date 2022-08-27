import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTemps, addDog } from '../actions/index.js';
import Header from '../components/Header.jsx';
import NavBarII from '../components/NavBarII.jsx';
import Footer from "../components/Footer.jsx";
import style from '../styles/FormPage.css';

function validation(input) {
    let err = {};
    if (!input.name) {
        err.name = 'Name can not be empty';
    } else if (!/^[a-zA-Z]+$/.test(input.name)) {
        err.name = 'Name should only contain letters';
    } else if (input.name.length < 4 || input.name.length > 12) {
        err.name = 'Name should contain between 4 to 12 characters';
    }

    if (!input.min_weight) {
        err.min_weight = 'MIN Weight can not be empty.';
    } else if (!/^[0-9]+$/.test(input.min_weight)) {
        err.min_weight = 'MIN Weight should only contain numbers.';
    } else if (input.min_weight < 0 || input.min_weight > 150) {
        err.min_weight = 'MIN Weight should be a number between 1 and 150.';
    }

    if (!input.max_weight) {
        err.max_weight = 'MAX Weight can not be empty.';
    } else if (!/^[0-9]+$/.test(input.max_weight)) {
        err.max_weight = 'MAX Weight should only contain numbers.';
    } else if (input.max_weight < 0 || input.max_weight > 150) {
        err.max_weight = 'MAX Weight should be a number between 1 and 150.';
    } else if (input.max_weight < input.min_weight) {
        err.max_weight = 'MAX Weight can not be lower than MIN Weight.';
        err.min_weight = 'MIN Weight can not be higher than MAX Weight.';
    }

    if (!input.min_height) {
        err.min_height = 'MIN Height can not be empty.';
    } else if (!/^[0-9]+$/.test(input.min_height)) {
        err.min_height = 'MIN Height should only contain numbers.';
    } else if (input.min_height < 0 || input.min_height > 150) {
        err.min_height = 'MIN Height should be a number between 1 and 150.';
    }

    if (!input.max_height) {
        err.max_height = 'MAX Height can not be empty.';
    } else if (!/^[0-9]+$/.test(input.max_height)) {
        err.max_height = 'MAX Height should only contain numbers.';
    } else if (input.max_height < 0 || input.max_height > 150) {
        err.max_height = 'MAX Height should be a number between 1 and 150.';
    } else if (input.max_height < input.min_height) {
        err.max_height = 'MAX Height can not be lower than MIN Height.';
        err.min_height = 'MIN Height can not be higher than MAX Height.';
    }

    if (!input.min_life_span) {
        err.min_life_span = 'MIN Lifespan can not be empty.';
    } else if (!/^[0-9]+$/.test(input.min_life_span)) {
        err.min_life_span = 'MIN Lifespan should only contain numbers.';
    } else if (input.min_life_span < 0 || input.min_life_span > 25) {
        err.min_life_span = 'MIN Lifespan should be between a number 1 and 25.';
    }

    if (!input.max_life_span) {
        err.max_life_span = 'MAX Lifespan can not be empty.';
    } else if (!/^[0-9]+$/.test(input.max_life_span)) {
        err.max_life_span = 'MAX Lifespan should only contain numbers.';
    } else if (input.max_life_span < 0 || input.max_life_span > 25) {
        err.max_life_span = 'MAX Lifespan should be a number between 1 and 25.';
    } else if (input.max_life_span < input.min_life_span) {
        err.max_life_span = 'MAX Lifespan can not be lower than MIN Lifespan.';
        err.min_life_span = 'MIN Lifespan can not be higher than MAX Lifespan.';
    }

    if (input.temperament.length > 6) {
        err.temperament = 'You can only select up to 6 temperaments.';
    }
    // {
    //  "name":"loli",
    //  "min_weight":"1",
    //  "max_weight":"2",
    //  "min_height":"1",
    //  "max_height":"2",
    //  "min_life_span":"1",
    //  "max_life_span":"2",
    //  "temperament": ["Charming"]
    //  }
    return err;
}

export default function FormPage() {

    const dispatch = useDispatch();
    const temps = useSelector((state) => state.temps);

    useEffect(() => dispatch(getTemps()), [dispatch]);

    const [err, setErr] = useState({});
    const [input, setInput] = useState({
        name: "",
        min_weight: "",
        max_weight: "",
        min_height: "",
        max_height: "",
        min_life_span: "",
        max_life_span: "",
        temperament: [],
    });

    function changeHandler(e) {
        setInput({
            ...input, [e.target.name]: e.target.value
        })
        setErr(validation({
            ...input, [e.target.name]: e.target.value
        }))
        console.log(input);
        console.log(err);
    }

    function selectHandler(e) {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
        e.target.value = 'default';
        console.log(input.temperament);
    }

    function deleteHandler(e) {
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t !== e)
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!err.name &&
            !err.min_weight &&
            !err.max_weight &&
            !err.min_height &&
            !err.max_height &&
            !err.min_life_span &&
            !err.max_life_span &&
            !err.mtemperament) {

            alert("New dog has been succesfully added!");

            dispatch(addDog(input));

            setInput({
                name: "",
                min_weight: "",
                max_weight: "",
                min_height: "",
                max_height: "",
                min_life_span: "",
                max_life_span: "",
                temperament: [],
            });
        } else {
            return alert("Make sure all the fields are correct.");
        }
    }

    return (

        <div id="FormPage">

            <Header />

            <NavBarII />

            <div id="Form">
                <form onSubmit={e => submitHandler(e)}>

                    <div id="name">
                        <label className="label">Name</label>
                        <input type="text" id="name" name="name" required onChange={(e) => changeHandler(e)} />
                        {err.name &&
                            <span className="error">{err.name}</span>
                        }
                    </div>

                    <div>

                        <label>Weight</label>

                        <div>
                            <label >MIN</label>

                            <input type="text" className="input" id="min_weight" name="min_weight" required onChange={(e) => changeHandler(e)} />
                            {err.min_weight &&
                                <span className="error">{err.min_weight}</span>
                            }
                        </div>

                        <div>
                            <label >MAX</label>
                            <input type="text" className="input" id="max_weight" name="max_weight" required onChange={(e) => changeHandler(e)} />
                            {err.max_weight &&
                                <span className="error">{err.max_weight}</span>
                            }
                        </div>
                    </div>

                    <div>
                        <label>Height</label>

                        <div>
                            <label >MIN</label>

                            <input type="text" className="input" id="min_height" name="min_height" required onChange={(e) => changeHandler(e)} />
                            {err.min_height &&
                                <span className="error">{err.min_height}</span>
                            }
                        </div>

                        <div>
                            <label >MAX</label>

                            <input type="text" className="input" id="max_height" name="max_height" required onChange={(e) => changeHandler(e)} />
                            {err.max_height &&
                                <span className="error">{err.max_height}</span>
                            }
                        </div>
                    </div>

                    <div>
                        <label>Life Span</label>

                        <div>
                            <label >MIN</label>

                            <input type="text" className="input" id="min_life_span" name="min_life_span" required onChange={(e) => changeHandler(e)} />
                            {err.min_life_span &&
                                <span className="error">{err.min_life_span}</span>
                            }
                        </div>

                        <div>
                            <label >MAX</label>

                            <input type="text" className="input" id="max_life_span" name="max_life_span" required onChange={(e) => changeHandler(e)} />
                            {err.max_life_span &&
                                <span className="error">{err.max_life_span}</span>
                            }
                        </div>
                    </div>

                    <div id="temps">
                        <label >Temperaments</label>

                        <select className="input" onChange={(e) => selectHandler(e)} defaultValue='default'>
                            <option value='default' disabled='default' hidden>Select Temperaments</option>
                            {temps.map((t) => {
                                return (
                                    <option value={t.name} key={t.id}>{t.name}</option>
                                )
                            })}
                        </select>

                        <div>
                            {input.temperament.map((t, i) => {
                                return <li value={t.name} key={i}> {t} <button onClick={() => deleteHandler(t)}> X </button> </li>
                            }
                            )}
                        </div>

                        {err.name &&
                            <span class='error'>{err.name}</span>
                        }
                    </div>

                    <button type="submit">Submit</button>

                </form>
            </div>

            <Footer />

        </div>
    )
};