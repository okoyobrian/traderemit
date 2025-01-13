import { NextRequest } from 'next/server';
import { pool } from '../rdsConnect';
import allowedUsers from '@/allowedUsers';
import { stytchClient } from '../stychClient';

export async function GET(req: NextRequest) {
  try {
    const session = await stytchClient.sessions.authenticate({
      session_token: req.cookies.get("stytch_session")?.value,
    });
    if (!session || !session.member.email_address_verified || !session.member.mfa_phone_number_verified || !session.member.untrusted_metadata || !allowedUsers.includes(session.member.email_address)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const businessId = session.organization.organization_id;

    const client = await pool.connect();
    const result = await client.query(`
    SELECT type AS business_type, choice_bank_approved
    FROM companies
    WHERE stych_org_id = $1;
    `, [businessId]);

    client.release();

    if (!result.rows[0]) {
      return new Response(JSON.stringify({ error: 'No business found. Your business is not correctly registered.' }), { status: 404 });
    }

    return new Response(JSON.stringify({ businessType: result.rows[0].business_type, bankApprovedStatus: result.rows[0].choice_bank_approved, businessName: session.organization.organization_name }), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Unauthorized or other error' }), { status: 401 });
  }
}