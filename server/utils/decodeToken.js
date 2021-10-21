import jwt from "jsonwebtoken"

const decodeToken = (req) => {
    const authorization = req.get('authorization')

    if ( authorization && authorization.toLowerCase().startsWith('bearer ') ) {
        const token = authorization.substring(7)
        try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        return decodedToken
        } catch {
            return null
        }
    }
    
    return null
}

export default decodeToken