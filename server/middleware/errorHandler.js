export const errorHandler = (err, req, res, next) => {
    console.log(err);
    console.error(err.stack);
    res.status(500).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
