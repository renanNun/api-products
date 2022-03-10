export default {
    jwt: {
        secret: process.env.APP_KEY || 'secret',
        expiresIn: '1d',
    }
}