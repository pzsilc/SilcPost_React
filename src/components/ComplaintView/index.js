import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AdminOneComplaintContainer } from '../Admin/OneComplaint';


const ComplaintView = props => {
    return(
        <AdminOneComplaintContainer 
            {...props} 
            clientMode={true} 
        />
    )
}

export const ComplaintViewContainer = connect(null, null)(ComplaintView)