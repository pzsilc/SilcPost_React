import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { ComplaintsHandler } from '../../api';
import complaintViewActions from '../../redux/complaintView/actions';
import loaderActions from '../../redux/loader/actions';
import Images from '../Admin/OneComplaint/Images';


const ComplaintView = props => {

    useEffect(() => props.setKey(props.match.params.key), []);

    useEffect(() => props.turnOffLoader(), [props.data])

    useEffect(() => {
        if(props._key){
            ComplaintsHandler.getOneComplaint(props._key)
            .then(res => {
                props.fetchData(res);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [props._key])

    if(props.loading){
        return(
            <div className="text-center">
                Loading...
            </div>
        )
    }

    return(
        <div className="mt-32 p-5">
            <h1 className="text-5xl mb-10">Twoja reklamacja</h1>
            <hr/>
            <div className="flex mt-10">
                <div className="w-4/12">
                    <table className="table-auto">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <td>{props.data.id}</td>
                            </tr>
                            <tr>
                                <th>Nr dokumentu</th>
                                <td>{props.data.document_number}</td>
                            </tr>
                            <tr>
                                <th>Powód reklamacji</th>
                                <td>{props.data.reason ? props.data.reason.name : ""}</td>
                            </tr>
                            <tr>
                                <th>Status</th>
                                <td>{props.data.status ? props.data.status.name : ""}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Images images={props.data.images} />
            </div>
            <br/>
            <small className="text-gray-400">Klucz: {props.data.key}</small>
        </div>
    )
}



const mapStateToProps = state => ({
    _key: state.complaintView.key,
    data: state.complaintView.data,
    loading: state.loader.loading
})

const mapDispatchToProps = dispatch => ({
    setKey: key => dispatch(complaintViewActions.setKey(key)),
    fetchData: data => dispatch(complaintViewActions.fetchData(data)),
    turnOffLoader: () => dispatch(loaderActions.turnOffLoader())
})

export const ComplaintViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ComplaintView)