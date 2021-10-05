export const UserErrors = {
    Conflict: {
        statusCode: 409,
        message: 'Email already exists',
        error: "Conflict Error"
    },

    NotFound: {
        apiErrorCode: 'E_0002_0002',
        errorMessage: 'User not found',
        reason: `Provided user ids doesn't exist in DB`
    }
}