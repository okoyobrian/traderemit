import { Pool } from 'pg';
import * as fs from 'fs';
import path from 'path';
import { Signer, SignerConfig } from '@aws-sdk/rds-signer';
import { awsCredentialsProvider } from "@vercel/functions/oidc";

const config: SignerConfig = {
    region: 'af-south-1',
    port: 5432,
    hostname: 'cowrie-public.c1y80ao66beu.af-south-1.rds.amazonaws.com',
    username: 'iam_user',
};
if (process.env.AWS_ROLE_ARN) {
    config.credentials = awsCredentialsProvider({
        roleArn: process.env.AWS_ROLE_ARN,
    });
}

const signer = new Signer(config);
const sslCert = fs.readFileSync(path.join(process.cwd(), 'af-south-1-bundle.pem'));
export const pool = new Pool({
    password: async () => await signer.getAuthToken(),
    user: 'iam_user',
    host: 'cowrie-public.c1y80ao66beu.af-south-1.rds.amazonaws.com',
    database: 'postgres',
    port: 5432,
    ssl: {
        ca: sslCert,
        rejectUnauthorized: true,
    },
});
