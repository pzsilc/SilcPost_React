import React from 'react'
import { getLocations } from '../../../../api'
import locationsActions from '../../../../redux/locations/actions'
import { connect } from 'react-redux'

const AddExisting = props => {
    React.useEffect(() => {
        getLocations().then(props.fetchLocations).catch(console.log)
    }, [])

    return(
        <form
            onSubmit={props.onSubmit}
            className="text-gray-300"
        >
            <div className="text-left mx-auto">
                <div className="bg-gray-400 rounded-xl text-gray-700 p-10">
                    <div className="flex">
                        <input
                            type="text"
                            className="w-1/2 mr-1 shadow rounded p-2 mt-2 bg-gray-200"
                            placeholder="Nr zamówienia"
                            onChange={props.onChange}
                            name="order_number"
                            value={props.data.order_number}
                            required
                        />
                        <input
                            type="text"
                            className="w-1/2 ml-1 shadow rounded p-2 mt-2 bg-gray-200"
                            placeholder="Nazwa klienta"
                            onChange={props.onChange}
                            name="client_name"
                            value={props.data.client_name}
                            required
                        />
                    </div>
                    <select
                        className="shadow rounded p-2 mt-2 bg-gray-200 w-full"
                        onChange={props.onChange}
                        name="location"
                        required
                    >
                        <option>Gdzie znajduje się paczka?...</option>
                        {props.locations.map((location, key) => 
                            <option
                                value={location.id} 
                                key={key}
                                selected={props.data.location == location.id}
                            >{location.name}</option>
                        )}
                    </select>
                    {props.data.location == 6 &&
                        <input
                            name="where_is_package"
                            value={props.data.where_is_package}
                            onChange={props.onChange}
                            type="text"
                            maxLength="128"
                            className="w-1/2 shadow rounded p-2 mt-2 bg-gray-200"
                            placeholder="Napisz gdzie"
                            required
                        />
                    }
                </div>
                <button
                    type="submit"
                    className="w-full p-3 rounded-xl mt-3 bg-purple-600 text-2xl text-purple-400"
                >
                    <b>Dołóż</b>
                </button>
            </div>
        </form>
    )
}

const mapStateToProps = state => ({
    locations: state.locations.list
})

const mapDispatchToProps = dispatch => ({
    fetchLocations: locations => dispatch(locationsActions.fetchLocations(locations))
})


export default connect(mapStateToProps, mapDispatchToProps)(AddExisting)