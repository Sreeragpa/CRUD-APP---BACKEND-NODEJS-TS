import * as jwt from "jsonwebtoken";

// Sign JWT
export function signJWT(payload: object, expiresIn: string | number): string {
    const accessToken = jwt.sign(payload, "secret");

    return accessToken;
}

// Verify JWT
export function verifyJWT(token: string): object | null {
    try {
        const decoded = jwt.verify(token, "secret");
        return decoded as object;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return null; // Token has expired
        } else {
            console.log("errororororo");
            throw error; // Other errors
        }
    }
}