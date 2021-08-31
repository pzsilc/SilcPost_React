import React from 'react';
import { connect } from 'react-redux';

const DashboardHome = props => {

    if(parseInt(props.user.is_superuser)){
        props.history.push('/grafiki/dashboard/list');
    }

    return(
        <div className="border p-5 mx-auto my-5" style={{
            width: '90%',
            maxWidth: '700px',
            marginTop: '200px',
            marginBottom: '600px'
        }}>
            <h1>{props.user.email}</h1>
            <br/>
            <hr/>
            <br/>
            {props.user.drugstores.map((drugstore, key) =>
                <a key={key} href={`/grafiki/dashboard/drugstores/${drugstore.id}`}>
                    {drugstore.name}
                </a>
            )}
        </div>
    )
}

const mapStateToProps = state => ({ user: state.auth.user });
export const DashboardHomeContainer = connect(mapStateToProps, null)(DashboardHome);
