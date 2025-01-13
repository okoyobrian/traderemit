import { B2BClient } from 'stytch';
import { NextRequest } from 'next/server';
import { pool } from '../rdsConnect';
import allowedUsers from '@/allowedUsers';

if (!process.env.STYTCH_PROJECT_ID || !process.env.STYTCH_SECRET) {
  throw new Error('Missing Stytch environment variables');
}
const stytchClient = new B2BClient({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { businessType } = await req.json();
    const session = await stytchClient.sessions.authenticate({
      session_token: req.cookies.get("stytch_session")?.value,
    });
    if (!session || !session.member.email_address_verified || !session.member.mfa_phone_number_verified || !session.member.untrusted_metadata || !allowedUsers.includes(session.member.email_address)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }


    console.log(session);

    const client = await pool.connect();
    const newCompany = await client.query(`
      INSERT INTO companies (name, type)
      VALUES ($1, $2)
      RETURNING id
    `, [session.organization.organization_name, businessType]);

    await client.query(`
      INSERT INTO users (email, phone_number, first_name, last_name, company_id)
      VALUES ($1, $2, $3, $4, $5)
    `, [session.member.email_address, session.member.mfa_phone_number, session.member.untrusted_metadata.firstName, session.member.untrusted_metadata.lastName, newCompany.rows[0].id]);

    return new Response(JSON.stringify({ success: 'Success' }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Unauthorized or other error' }), { status: 401 });
  }
}