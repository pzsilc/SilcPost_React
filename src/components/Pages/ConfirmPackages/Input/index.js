import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const Input = props => {
    return (
        <div>
            <div className="d-flex justify-content-between bg-gray-400 p-3">
            <Modal
                show={props.displayModal}
                onHide={() => props.setDisplayModal(false)}
            >
                <form onSubmit={props.submit}>
                    <Modal.Header>
                        <h2>Kod: {props.code}</h2>
                        <button 
                            onClick={() => props.setDisplayModal(false)}
                            className="fa fa-times"
                        ></button>
                    </Modal.Header>
                    <Modal.Body>
                    <div>
                        <input
                            type="hidden"
                            name="id"
                            value={props.code}
                        />
                        <input
                            type="text"
                            name="waybill"
                            className="form-control"
                            placeholder="Nr listu przewozowego"
                            required
                        />
                        <input
                            type="text"
                            name="catcher"
                            className="form-control mt-2"
                            placeholder="Do kogo przekazane?"
                            required
                        />
                    </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => props.setDisplayModal(false)}>
                            Anuluj
                        </Button>
                        <Button variant="primary" type="submit">
                            Zatwierdź
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            <h3 className="text-xl text-gray-300">
                <b>Sekcja skanowania</b>
            </h3>
            <div>
                <button 
                    onClick={props.getStatistics}
                    className="hover:no-underline mr-5"
                >
                    <i className="fa fa-download mr-2"></i>
                    Pobierz statystyki
                </button>
                <Link 
                    to="/silcpost/logout"
                    className="hover:no-underline"
                >
                    <i className="fa fa-sign-out-alt mr-2"></i>
                    Wyloguj się
                </Link>
            </div>
            </div>
            <form 
            className="bg-gray-200 p-3"
            onSubmit={props.onSubmit}
            >
            <input
                input="text"
                name="_code"
                value={props.code}
                onChange={props.onChange}
                className="bg-yellow-200 w-full p-5"
                style={{ fontSize: '120px' }}
            />
            </form>
        </div>
    )
}

export default Input;