import React from 'react'
import { createNotification, download } from '../../../functions'
import { getExcel } from '../../../api'
import { connect } from 'react-redux'

const Download = (props) => {
    const getStatistics = () => {
        getExcel()
        .then(res => res.data)
        .then(res => download(res))
        .catch(err => {
            console.log(err)
            createNotification('error', 'Nie udało się pobrać statystyk')
        })
    }

    return (
        <div>
            <button 
                onClick={getStatistics}
                className="hover:no-underline ml-5 text-gray-400"
            >
                <i className="fa fa-download mr-2"></i>
                Pobierz statystyki
            </button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export const DownloadContainer = connect(mapStateToProps, null)(Download)

