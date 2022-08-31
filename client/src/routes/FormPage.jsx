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
        err.name = 'Can not be empty';
    } else if (!/^[a-zA-Z]+$/.test(input.name)) {
        err.name = 'Should only contain letters';
    } else if (input.name.length < 4 || input.name.length > 12) {
        err.name = 'Should contain between 4 to 12 characters';
    }

    if (!input.min_weight) {
        err.min_weight = 'Can not be empty.';
    } else if (!/^[0-9]+$/.test(input.min_weight)) {
        err.min_weight = 'Should only contain numbers.';
    } else if (input.min_weight < 0 || input.min_weight > 150) {
        err.min_weight = 'Should be between 1 and 150.';
    }

    if (!input.max_weight) {
        err.max_weight = 'Can not be empty.';
    } else if (!/^[0-9]+$/.test(input.max_weight)) {
        err.max_weight = 'Should only contain numbers.';
    } else if (input.max_weight < 0 || input.max_weight > 150) {
        err.max_weight = 'Should be between 1 and 150.';
    } else if (input.max_weight < input.min_weight) {
        err.max_weight = 'Can not be lower than MIN.';
        err.min_weight = 'Can not be higher than MAXt.';
    }

    if (!input.min_height) {
        err.min_height = 'Can not be empty.';
    } else if (!/^[0-9]+$/.test(input.min_height)) {
        err.min_height = 'Should only contain numbers.';
    } else if (input.min_height < 0 || input.min_height > 150) {
        err.min_height = 'Should be between 1 and 150.';
    }

    if (!input.max_height) {
        err.max_height = 'Can not be empty.';
    } else if (!/^[0-9]+$/.test(input.max_height)) {
        err.max_height = 'Should only contain numbers.';
    } else if (input.max_height < 0 || input.max_height > 150) {
        err.max_height = 'Should be between 1 and 150.';
    } else if (input.max_height < input.min_height) {
        err.max_height = 'Can not be lower than MIN.';
        err.min_height = 'Can not be higher than MAX.';
    }

    if (!input.min_life_span) {
        err.min_life_span = 'Can not be empty.';
    } else if (!/^[0-9]+$/.test(input.min_life_span)) {
        err.min_life_span = 'Should only contain numbers.';
    } else if (input.min_life_span < 0 || input.min_life_span > 25) {
        err.min_life_span = 'Should be between 1 and 25.';
    }

    if (!input.max_life_span) {
        err.max_life_span = 'Can not be empty.';
    } else if (!/^[0-9]+$/.test(input.max_life_span)) {
        err.max_life_span = 'Should only contain numbers.';
    } else if (input.max_life_span < 0 || input.max_life_span > 25) {
        err.max_life_span = 'Should be between 1 and 25.';
    } else if (input.max_life_span < input.min_life_span) {
        err.max_life_span = 'Can not be lower than MIN.';
        err.min_life_span = 'Can not be higher than MAX.';
    }

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
        if (input.temperament?.length >= 6) {
            alert('You can only select up to 6 temperaments.');
        } else if (input.temperament?.includes(e.target.value)) {
            alert('You already chose this temperaments.');
        } else {
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
            e.target.value = 'default';
            console.log(input.temperament);
            console.log(err.temperament);
        }
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
            !err.max_life_span) {

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

        <div id="FormPage" style={style}>

            <Header />

            <NavBarII />

            <div id="containerForm">
                <form id="Form" onSubmit={e => submitHandler(e)}>

                    <h1>Add your own dog!</h1>

                    <div className="sub">
                        <p className="labelForm">Name:</p>

                        <div className="err">
                            <input value={input.name} id='big' type="text" name="name" onChange={(e) => changeHandler(e)} />
                            {err.name &&
                                <span className="error">{err.name}</span>
                            }
                        </div>
                    </div>



                    <div className="sub">
                        <p className="labelForm">Weight:</p>

                        <div className="err">
                            <input className='small' placeholder="MIN" value={input.min_weight} type="text" name="min_weight" required onChange={(e) => changeHandler(e)} />
                            {err.min_weight &&
                                <span className="error">{err.min_weight}</span>
                            }
                        </div>

                        <div className="err">
                            <input className='small' placeholder="MAX" value={input.max_weight} type="text" name="max_weight" required onChange={(e) => changeHandler(e)} />
                            {err.max_weight &&
                                <span className="error">{err.max_weight}</span>
                            }
                        </div>

                    </div>




                    <div className="sub">
                        <p className="labelForm">Height:</p>

                        <div className="err">
                            <input className='small' placeholder="MIN" value={input.min_height} type="text" name="min_height" required onChange={(e) => changeHandler(e)} />
                            {err.min_height &&
                                <span className="error">{err.min_height}</span>
                            }
                        </div>

                        <div className="err">
                            <input className='small' placeholder="MAX" value={input.max_height} type="text" name="max_height" required onChange={(e) => changeHandler(e)} />
                            {err.max_height &&
                                <span className="error">{err.max_height}</span>
                            }
                        </div>

                    </div>




                    <div className="sub">
                        <p className="labelForm">Lifespan:</p>

                        <div className="err">
                            <input className='small' placeholder="MIN" value={input.min_life_span} type="text" name="min_life_span" required onChange={(e) => changeHandler(e)} />
                            {err.min_life_span &&
                                <span className="error">{err.min_life_span}</span>
                            }
                        </div>

                        <div className="err">
                            <input className='small' placeholder="MAX" value={input.max_life_span} type="text" name="max_life_span" required onChange={(e) => changeHandler(e)} />
                            {err.max_life_span &&
                                <span className="error">{err.max_life_span}</span>
                            }
                        </div>

                    </div>



                    <div id="temps">
                        <div id="sub">
                            <p className="labelForm" >Temperaments:</p>

                            <select className="input" onChange={(e) => selectHandler(e)} defaultValue='default'>
                                <option value='default' disabled='default' hidden>Select Temperaments</option>
                                {temps.map((t, i) => {
                                    return (
                                        <option value={t.name} key={t.id}>{t.name}</option>
                                    )
                                })}
                            </select>
                        </div>

                        <div id="tempContainer">
                            {input.temperament.map((t, i) => {
                                return <li className="saved" value={t.name} key={i}> {t} <button onClick={() => deleteHandler(t)}> X </button> </li>
                            }
                            )}
                        </div>

                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>

            <Footer />

        </div>
    )
};