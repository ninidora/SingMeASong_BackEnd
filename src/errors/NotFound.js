class NotFound extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFound';
        this.statusCode = 404;
    }
}

export default NotFound;
