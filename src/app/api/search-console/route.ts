/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest) {
    try {
        const {
            GSC_CLIENT_ID,
            GSC_CLIENT_SECRET,
            GSC_REFRESH_TOKEN,
            GSC_SITE_URL,
        } = process.env;

        if (!GSC_CLIENT_ID || !GSC_CLIENT_SECRET || !GSC_REFRESH_TOKEN || !GSC_SITE_URL) {
            throw new Error('Missing required environment variables');
        }

        const oauth2Client = new google.auth.OAuth2(GSC_CLIENT_ID, GSC_CLIENT_SECRET);
        oauth2Client.setCredentials({ refresh_token: GSC_REFRESH_TOKEN });

        const searchconsole = google.searchconsole({
            version: 'v1',
            auth: oauth2Client,
        });

        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split('T')[0];

        console.log('Making request to Search Console API...');
        const response = await searchconsole.searchanalytics.query({
            siteUrl: GSC_SITE_URL,
            requestBody: {
                startDate,
                endDate,
                dimensions: ['date'],
                rowLimit: 1000,
                metrics: ['CLICKS', 'IMPRESSIONS', 'CTR', 'POSITION'],
            } as any,  // Cast to `any` temporarily to avoid type issues.
        });

        return NextResponse.json({ data: response.data }, { status: 200 });
    } catch (error: any) {
        console.error('Error during API request:', error.response ? error.response.data : error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
