import { combineReducers } from 'redux'
import fetch from 'isomorphic-fetch'


// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_PAGE = 'SELECT_PAGE'
export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
export function selectPage(pageName) {
    return {
        type: SELECT_PAGE,
        pageName
    }
}

export function requestPage(pageName) {
    return {
        type: REQUEST_PAGE,
        pageName
    }
}

export function receivePage(pageName, data) {
    return {
        type: RECEIVE_PAGE,
        pageName,
        data: data
    }
}

export function fetchPage(pageName) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {
        let dataPath = __DATA_PATH__

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestPage(pageName))

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        let jsonldDoc = pageName
        if ('' === jsonldDoc || jsonldDoc.endsWith('/')) {
            jsonldDoc = jsonldDoc + 'index'
        }

        jsonldDoc = `${dataPath}/${jsonldDoc}.jsonld`

        return fetch(jsonldDoc)
            .then(response => response.json())
            .then(data =>
                dispatch(receivePage(pageName, data))
            )

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
function selectedPage(state = '', action) {
    switch (action.type) {
        case SELECT_PAGE:
            return action.pageName
        default:
            return state
    }
}

function pages(state = {}, action) {
    switch (action.type) {
        case REQUEST_PAGE:
            return Object.assign({}, state, {
                [action.pageName]: { isFetching: true, data: {} }
            })
        case RECEIVE_PAGE:
            return Object.assign({}, state, {
                [action.pageName]: { isFetching: false, data: action.data }
            })
        default:
            return state
    }
}

const pageReducer = combineReducers({
    pages,
    selectedPage
})

export default pageReducer
