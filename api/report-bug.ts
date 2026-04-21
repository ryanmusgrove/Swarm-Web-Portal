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

  const linear = new LinearClient({ apiKey });
  const { title, description, engineVersion, gpuInfo } = req.body;

  try {
    const issue = await linear.createIssue({
      teamId: teamId,
      title: `[BUG] ${title}`,
      description: `**Reporter Description:**\n${description}\n\n---\n**Technical Metadata (System Audit):**\n- **Engine Build:** ${engineVersion}\n- **GPU/Renderer:** ${gpuInfo}\n- **Browser Context:** ${req.headers['user-agent']}`,
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
