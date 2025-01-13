import { B2BClient } from 'stytch';

if (!process.env.STYTCH_PROJECT_ID || !process.env.STYTCH_SECRET) {
    throw new Error('Missing Stytch environment variables');
}
export const stytchClient = new B2BClient({
    project_id: process.env.STYTCH_PROJECT_ID,
    secret: process.env.STYTCH_SECRET,
});
