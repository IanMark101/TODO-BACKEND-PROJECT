export const sendResponse = (res, statusCode, message, data, errors) => {
    return res.status(statusCode).json({
        success: statusCode < 400,
        statusCode,
        message,
        ...(data && { data }),
        ...(errors && errors.length > 0 && { errors }),
    });
};
export const sendSuccess = (res, statusCode = 200, message = "Success", data) => {
    return sendResponse(res, statusCode, message, data);
};
export const sendError = (res, statusCode = 500, message = "Error", errors) => {
    return sendResponse(res, statusCode, message, undefined, errors);
};
//# sourceMappingURL=response.js.map