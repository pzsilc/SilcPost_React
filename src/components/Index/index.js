import React, { useEffect } from 'react';
import addComplaintActions from '../../redux/addComplaint/actions';
import reasonsActions from '../../redux/reasons/actions';
import { connect } from 'react-redux'
import { ReasonsHandler, ComplaintsHandler } from '../../api';
import Form from './Form';
import StepsList from './StepsList';
import { Link } from "react-router-dom";
import $ from 'jquery';



const Index = props => {

    useEffect(() => {
        (async () => {
            let reasons = await ReasonsHandler.getReasons();
            props.fetchReasons(reasons);
        })()
    }, [])

    const onChange = e => {
        const { name, value } = e.target;
        props.updateField(name, value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let data = props.formData;
        data.description = document.querySelector('textarea[name="_description"]').value;
        data.title = document.querySelector('input[name="title"]').value;
        let res = await ComplaintsHandler.checkIfExistsByDocumentNumber(props.formData.document_number);
        if(!res.data.result){
            return alert('Podany nr dokumentu nie istnieje');
        }
        
        await ComplaintsHandler.postComplaint(data)
        .then(res => {
            console.log(res);
            props.fetchResult(res);
        })
        .catch(err => {
            console.log(err)
            alert('Nie udało się zapisać danych. Błąd w konsoli');
        })
    }

    if(!$.isEmptyObject(props.result)){
        return(
            <div className="text-center mt-48">
                <i className="fa fa-check text-green-500 text-9xl"></i>
                <p className="text-green-500 text-xl mt-5">Twoja reklamacja została zapisana</p>
                <div className="my-64">
                    <h6>Link do reklamacji</h6>
                    <br/>
                    <Link to={`/complaint/${props.result.key}`} className="text-green-300">{`/complaint/${props.result.key}`}</Link>
                </div>
            </div>
        )
    }
    else{
        return (
            <div>
                <StepsList/>
                <Form
                    onSubmit={onSubmit}
                    onChange={onChange}
                    setImages={props.setImages}
                    props={props}
                />
            </div>
        )
    }
}




const mapStateToProps = state => ({
    reasons: state.reasons.reasons,
    formData: state.addComplaint.data,
    result: state.addComplaint.result
})

const mapDispatchToProps = dispatch => ({
    fetchReasons: reasons => dispatch(reasonsActions.fetchReasons(reasons)),
    updateField: (name, value) => dispatch(addComplaintActions.updateField(name, value)),
    setImages: images => dispatch(addComplaintActions.setImages(images)),
    fetchResult: data => dispatch(addComplaintActions.fetchResult(data))
})

export const IndexContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
