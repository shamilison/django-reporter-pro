/**
 * Return message for HTTP status code
 * @param {number} status - HTTP status code
 * @returns {string} Message of network operation
 */
function _getStatusMessage(status) {
    let message = ''
    switch (status) {
        case 200:
            message = 'All done. Request successfully executed'
            break
        case 201:
            message = 'Data successfully created'
            break
        case 400:
            message = 'Bad Request'
            break
        case 401:
            message = 'Need auth'
            break
        case 404:
            message = 'Not found'
            break
        case 503:
            message = 'Service unavailable. Try again later'
            break
        default:
            message = 'Something wrong. Client default error message'
            break
    }
    return message
}

function _getResponseErrorMessage(error) {
    if (error.response && error.response.data) return error.response.data.message
    if (error.response && error.response.statusText) return error.response.statusText
    return error.message === 'Network Error' ? 'Oops! Network Error. Try again later' : error.message
}

/**
 * Create instant, which represent error object
 * @param {Object} [error] - axios error object
 * @param {String} [message] - custom message to display
 */
export class ErrorWrapper extends Error {
    constructor(error, message) {
        super()
        this.data = error.response ? error.response.data : false
        this.code = error.response ? error.response.status : false
        this.statusText = error.response ? error.response.statusText : false
        this.statusMessage = _getStatusMessage(this.status)
        this.message = message || _getResponseErrorMessage(error)

        console.log('Following error occurred:')
        console.group([
            this.data,
            this.code,
            this.statusText,
            this.message,
            this.statusMessage,
        ])
    }
}