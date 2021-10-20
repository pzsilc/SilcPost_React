import types from './types'

const fetchLocations = locations => ({
    type: types.FETCH_LOCATIONS,
    locations
})

export default {
    fetchLocations
}