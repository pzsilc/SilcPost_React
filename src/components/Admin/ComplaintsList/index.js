import React, { useEffect } from 'react';
import complaintsActions from '../../../redux/complaints/actions';
import { connect } from 'react-redux';
import { ComplaintsHandler } from '../../../api';
import { Link } from "react-router-dom";


const AdminComplaintsList = props => {
    
    useEffect(() => {
        (async () => {
            const complaints = await ComplaintsHandler.getComplaints(null, props.token);
            props.fetchComplaintsList(complaints);
        })();
    }, []);

    return(
        <div>
            <table className="text-center table-auto mx-auto">
                <thead>
                    <tr className="bg-green-500">
                        <th className="w-4/12">Tytuł</th>
                        <th className="w-2/12">Data dodania</th>
                        <th className="w-2/12">Właściciel</th>
                        <th className="w-1/12">Status</th>
                        <th className="w-1/12">Powód</th>
                        <th className="w-1/12">Zakończone</th>
                        <th className="w-1/12">Link</th>
                    </tr>
                </thead>
                <tbody>
                    {props.complaints.map((complaint, key) =>
                        <tr 
                            key={key}
                            className={key % 2 ? 'bg-green-400' : 'bg-green-200'}
                        >
                            <td>{complaint.title}</td>
                            <td>{complaint.created_at}</td>
                            <td>{complaint.email}</td>
                            <td>{complaint.status ? complaint.status.name : ""}</td>
                            <td>{complaint.reason ? complaint.reason.name : ""}</td>
                            <td>{complaint.ended_at ? "Tak" : "Nie"}</td>
                            <td>
                                <Link to={`/admin/complaints/${complaint.key}`}>
                                    <i className="fa fa-sign-in-alt"></i>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}



const mapStateToProps = state => ({
    token: state.token.token,
    complaints: state.complaints.list
})

const mapDispatchToProps = dispatch => ({
    fetchComplaintsList: list => dispatch(complaintsActions.fetchComplaintsList(list))
})

export const AdminComplaintsListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminComplaintsList)