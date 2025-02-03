import crypto from 'crypto';

function generateSecretKey(length = 64) {
    return crypto.randomBytes(length).toString('hex');
}

// Generate JWT secret key
const accessSecret = generateSecretKey(32);
const refreshSecret = generateSecretKey(64);

console.log(`JWT_ACCESS_SECRET: ${accessSecret}`);
console.log(`JWT_REFRESH_SECRET: ${refreshSecret}`);
