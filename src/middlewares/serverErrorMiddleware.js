const serverErrorMiddleware = (err, req, res, next) => {
    console.error('SERVER ERROR', err);
    return res.sendStatus(500);
};

export default serverErrorMiddleware;
