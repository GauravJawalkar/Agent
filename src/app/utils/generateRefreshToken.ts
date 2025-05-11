import jwt from 'jsonwebtoken'

const REFRESH_SECRET = process.env.REFRESH_SECRET || 'your-refresh-secret'; // use env var in production
const REFRESH_EXPIRES_IN = '30d'; // typically 7–30 days

interface RefreshTokenPayload {
    userId: string;
    email?: string;
}

export default function generateRefreshToken(payload: RefreshTokenPayload): string {
    return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES_IN });
}
