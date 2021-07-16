import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { ComplaintsHandler } from '../../../api';
import complaintViewActions from '../../../redux/complaintView/actions';
import loaderActions from '../../../redux/loader/actions';
import orderActions from '../../../redux/order/actions';
import Images from './Images';
import Order from './Order';


const AdminOneComplaint = props => {

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

    useEffect(() => {
        if(props.data){
            ComplaintsHandler.getOrderByComplaintKey(props.data.key)
            .then(res => {
                props.fetchOrder(res);
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [props.data]);

    const execute = () => {
        ComplaintsHandler.patchComplaint(props.data.id, {
            status_id: props.data.status_id + 1
        }, props.token)
        .then(res => {
            console.log(res)
            props.history.push('/admin/complaints/' + props._key)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getExecuteTextByStatusId = id => {
        switch(id){
            case 1: return "Rozpocznij wykonywanie reklamacji";
            case 2: return "Zakończ reklamację";
            default: return "";
        }
    }

    if(props.loading){
        return(
            <div className="text-center">
                Loading...
            </div>
        )
    }

    return(
        <div className="mt-32 p-5">
            <h1 className="text-5xl mb-10">Reklamacja #{props.data.id}</h1>
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
                            <tr>
                                <th>Email kontaktowy</th>
                                <td>{props.data.email}</td>
                            </tr>
                        </tbody>
                    </table>
                    {(props.data.status && !props.data.status.id !== 3) && 
                        <div>
                            <button 
                                className=""
                                onClick={execute}
                            >
                                {getExecuteTextByStatusId(props.data.status.id)}
                            </button>
                        </div>
                    }
                </div>
                <div className="w-8/12 border-l-2 border-gray-200 pl-20">
                    <h3 className="text-2xl"><b>Tytuł:</b> {props.data.title}</h3>
                    <br/>
                    <b>Opis</b>
                    <div className="text-sm" dangerouslySetInnerHTML={{ __html: props.data.description }}/>
                    <Images images={props.data.images}/>
                </div>
            </div>
            <br/>
            <small className="text-gray-400">Klucz: {props.data.key}</small>
            <Order />
        </div>
    )
}



const mapStateToProps = state => ({
    _key: state.complaintView.key,
    data: state.complaintView.data,
    loading: state.loader.loading,
    token: state.token.token,
    order: state.order.order
})

const mapDispatchToProps = dispatch => ({
    setKey: key => dispatch(complaintViewActions.setKey(key)),
    fetchData: data => dispatch(complaintViewActions.fetchData(data)),
    turnOffLoader: () => dispatch(loaderActions.turnOffLoader()),
    fetchOrder: order => dispatch(orderActions.fetchOrder(order))
})

export const AdminOneComplaintContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOneComplaint)