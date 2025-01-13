// pages/api/connect-db.js
import { pool } from '../rdsConnect';



export async function POST(req: Request): Promise<Response> {
    const formData = await req.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone_number = formData.get('phone_number');

    if (!name || !email || !phone_number) {
        return new Response(JSON.stringify({ message: 'Name, email, and phone number are required.' }), { status: 400 });
    }

    try {
        // Set up the PostgreSQL client
        const client = await pool.connect();

        // Query the database (example)
        const result = await client.query(`
            INSERT INTO waitlist_signups (name, email, phone_number)
            VALUES ($1, $2, $3)    
        `, [name, email, phone_number]);

        console.log('Database Result:', result);

        // Return a success response
        return new Response('Success', { status: 200 });
    } catch (error) {
        // @ts-expect-error error is type unknown
        if ('code' in error && error.code === '23505') {
            return new Response(JSON.stringify({ message: 'Email already exists in the database', code: 'user-exists' }), { status: 200 });
        } else {
        console.error('Error connecting to DB:', JSON.stringify(error));
        return new Response(JSON.stringify({ message: 'Failed to connect to database' }), { status: 500 });
        }
    }
}