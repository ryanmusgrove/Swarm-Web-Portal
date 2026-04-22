export interface LinearDefaults {
    teamId: string;
    labelIds?: string[];
    projectId?: string;
    assigneeId?: string;
}

export function getLinearCredentials(): { apiKey: string; teamId: string } | null {
    const apiKey = process.env['LINEAR_API_KEY'];
    const teamId = process.env['LINEAR_TEAM_ID_WEB'];
    if (!apiKey || !teamId) return null;
    return { apiKey, teamId };
}

export function getLinearDefaults(teamId: string): LinearDefaults {
    const defaults: LinearDefaults = { teamId };

    const labelIds = parseCsv(process.env['LINEAR_DEFAULT_LABEL_IDS']);
    if (labelIds.length > 0) defaults.labelIds = labelIds;

    const projectId = process.env['LINEAR_DEFAULT_PROJECT_ID']?.trim();
    if (projectId) defaults.projectId = projectId;

    const assigneeId = process.env['LINEAR_DEFAULT_ASSIGNEE_ID']?.trim();
    if (assigneeId) defaults.assigneeId = assigneeId;

    return defaults;
}

export function getPortalEngineVersion(): string {
    return process.env['PORTAL_ENGINE_VERSION']?.trim() || 'unknown';
}

function parseCsv(value: string | undefined): string[] {
    if (!value) return [];
    return value.split(',').map(s => s.trim()).filter(Boolean);
}
