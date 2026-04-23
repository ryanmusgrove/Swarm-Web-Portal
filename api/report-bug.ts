import { LinearClient } from '@linear/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getLinearCredentials, getLinearDefaults, getPortalEngineVersion } from './_config/linear.js';

interface BugReportBody {
    title?: unknown;
    description?: unknown;
    includeTelemetry?: unknown;
    gpuInfo?: unknown;
}

interface IssueBodyInput {
    description: string;
    engineVersion: string;
    includeTelemetry: boolean;
    gpuInfo?: string;
    userAgent?: string;
    submittedAt: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const credentials = getLinearCredentials();
    if (!credentials) {
        return res.status(500).json({ success: false, error: 'Server missing Linear credentials.' });
    }

    const { title, description, includeTelemetry, gpuInfo } = (req.body ?? {}) as BugReportBody;
    if (typeof title !== 'string' || typeof description !== 'string' || !title.trim() || !description.trim()) {
        return res.status(400).json({ success: false, error: 'Missing title or description.' });
    }

    const telemetryOn = includeTelemetry === true;
    const bodyInput: IssueBodyInput = {
        description: description.trim(),
        engineVersion: getPortalEngineVersion(),
        includeTelemetry: telemetryOn,
        submittedAt: new Date().toISOString(),
    };
    if (telemetryOn && typeof gpuInfo === 'string') bodyInput.gpuInfo = gpuInfo;
    if (telemetryOn && typeof req.headers['user-agent'] === 'string') {
        bodyInput.userAgent = req.headers['user-agent'];
    }

    const defaults = getLinearDefaults(credentials.teamId);
    const linear = new LinearClient({ apiKey: credentials.apiKey });

    let timeoutId: NodeJS.Timeout | undefined;
    try {
        const createIssuePromise = linear.createIssue({
            ...defaults,
            title: `[BUG] ${title.trim()}`,
            description: buildIssueBody(bodyInput),
            priority: 2,
        });
        const timeoutPromise = new Promise<never>((_, reject) => {
            timeoutId = setTimeout(() => reject(new Error('Linear API timeout')), 8000);
        });

        const issue = await Promise.race([createIssuePromise, timeoutPromise]);

        if (issue.success) {
            const createdIssue = await issue.issue;
            return res.status(200).json({ success: true, id: createdIssue?.identifier });
        }

        throw new Error('Linear API failed to create issue');
    } catch (error: unknown) {
        const detail = error instanceof Error ? error.message : String(error);
        console.error('Linear API Error:', detail);
        return res.status(500).json({ success: false, error: 'Failed to submit bug report. Please try again.' });
    } finally {
        if (timeoutId) clearTimeout(timeoutId);
    }
}

export function buildIssueBody(input: IssueBodyInput): string {
    const metadata: string[] = [
        `- **Submitted At:** ${input.submittedAt}`,
        `- **Engine Build:** ${input.engineVersion}`,
    ];

    if (input.includeTelemetry) {
        metadata.push(`- **GPU/Renderer:** ${input.gpuInfo ?? 'unavailable'}`);
        metadata.push(`- **Browser Context:** ${normalizeUserAgent(input.userAgent)}`);
    } else {
        metadata.push(`- **Telemetry:** Opted out`);
    }

    return [
        '**Reporter Description:**',
        input.description,
        '',
        '---',
        '**Technical Metadata:**',
        metadata.join('\n'),
    ].join('\n');
}

export function normalizeUserAgent(ua: string | undefined): string {
    if (!ua) return 'unknown';
    const patterns: Array<[RegExp, string]> = [
        [/Edg\/(\d+(?:\.\d+)?)/, 'Edge'],
        [/OPR\/(\d+(?:\.\d+)?)/, 'Opera'],
        [/Firefox\/(\d+(?:\.\d+)?)/, 'Firefox'],
        [/Chrome\/(\d+(?:\.\d+)?)/, 'Chrome'],
        [/Version\/(\d+(?:\.\d+)?).*Safari/, 'Safari'],
    ];
    const osMatch = ua.match(/\(([^)]+)\)/);
    const os = osMatch?.[1]?.split(';')[0]?.trim() ?? 'unknown OS';
    for (const [pattern, name] of patterns) {
        const m = ua.match(pattern);
        if (m?.[1]) return `${name} ${m[1]} · ${os}`;
    }
    return ua.slice(0, 200);
}
