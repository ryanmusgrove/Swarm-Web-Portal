import { LinearClient } from '@linear/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const apiKey = process.env['LINEAR_API_KEY'];
  const teamId = process.env['LINEAR_TEAM_ID_WEB'];

  if (!apiKey || !teamId) {
    return res.status(500).json({ success: false, error: 'Server missing Linear credentials.' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const title = body['title'];
  const description = body['description'];
  const engineVersion = body['engineVersion'];
  const includeTelemetry = body['includeTelemetry'] === true;
  const gpuInfo = body['gpuInfo'];

  if (typeof title !== 'string' || title.trim().length === 0 || title.length > 60) {
    return res.status(400).json({ success: false, error: 'Invalid title' });
  }
  if (typeof description !== 'string' || description.trim().length === 0 || description.length > 250) {
    return res.status(400).json({ success: false, error: 'Invalid description' });
  }
  if (typeof engineVersion !== 'string' || engineVersion.length === 0 || engineVersion.length > 20) {
    return res.status(400).json({ success: false, error: 'Invalid engineVersion' });
  }
  if (includeTelemetry && gpuInfo !== undefined && (typeof gpuInfo !== 'string' || gpuInfo.length > 500)) {
    return res.status(400).json({ success: false, error: 'Invalid gpuInfo' });
  }

  const userAgent = String(req.headers['user-agent'] ?? 'unknown').slice(0, 500);
  const linear = new LinearClient({ apiKey });

  const metadataLines = [`- **Engine Build:** ${engineVersion}`];
  if (includeTelemetry) {
    metadataLines.push(`- **GPU/Renderer:** ${typeof gpuInfo === 'string' ? gpuInfo : 'Unknown'}`);
    metadataLines.push(`- **Browser Context:** ${userAgent}`);
  } else {
    metadataLines.push(`- **Telemetry:** Opted out`);
  }

  try {
    const issue = await linear.createIssue({
      teamId: teamId,
      title: `[BUG] ${title}`,
      description: `**Reporter Description:**\n${description}\n\n---\n**Technical Metadata (System Audit):**\n${metadataLines.join('\n')}`,
      priority: 2,
    });

    if (issue.success) {
      const createdIssue = await issue.issue;
      return res.status(200).json({ success: true, id: createdIssue?.identifier });
    }

    throw new Error("Linear API failed to create issue");
  } catch (error: any) {
    console.error("Linear API Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
