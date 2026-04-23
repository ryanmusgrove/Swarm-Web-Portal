import { describe, it, expect } from 'vitest';
import { normalizeUserAgent, buildIssueBody } from './report-bug';

describe('normalizeUserAgent', () => {
    it('returns "unknown" for undefined', () => {
        expect(normalizeUserAgent(undefined)).toBe('unknown');
    });

    it('returns "unknown" for empty string', () => {
        expect(normalizeUserAgent('')).toBe('unknown');
    });

    it('detects Chrome on Windows', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
        expect(normalizeUserAgent(ua)).toBe('Chrome 120.0 · Windows NT 10.0');
    });

    it('detects Edge before Chrome (Edge UA contains both)', () => {
        const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0';
        expect(normalizeUserAgent(ua)).toBe('Edge 120.0 · Windows NT 10.0');
    });

    it('detects Firefox on macOS', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0';
        expect(normalizeUserAgent(ua)).toBe('Firefox 121.0 · Macintosh');
    });

    it('detects Safari on macOS', () => {
        const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15';
        expect(normalizeUserAgent(ua)).toBe('Safari 17.2 · Macintosh');
    });

    it('falls back to truncated UA when no pattern matches', () => {
        const ua = 'CustomCrawler/1.0 (internal bot)';
        expect(normalizeUserAgent(ua)).toBe('CustomCrawler/1.0 (internal bot)');
    });

    it('truncates unmatched UAs to 200 chars', () => {
        const long = 'X'.repeat(500);
        expect(normalizeUserAgent(long).length).toBe(200);
    });

    it('handles missing parenthesized OS block', () => {
        expect(normalizeUserAgent('Chrome/120.0')).toBe('Chrome 120.0 · unknown OS');
    });
});

describe('buildIssueBody', () => {
    const base = {
        description: 'Steps: click button, observe crash.',
        engineVersion: 'v7.0.4',
        submittedAt: '2026-04-22T12:00:00.000Z',
    };

    it('includes GPU and browser context when telemetry is on', () => {
        const body = buildIssueBody({
            ...base,
            includeTelemetry: true,
            gpuInfo: 'NVIDIA GeForce RTX 4090',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0) Chrome/120.0.0.0',
        });
        expect(body).toContain('Steps: click button, observe crash.');
        expect(body).toContain('v7.0.4');
        expect(body).toContain('NVIDIA GeForce RTX 4090');
        expect(body).toContain('Chrome 120.0 · Windows NT 10.0');
        expect(body).not.toContain('Opted out');
    });

    it('shows "Opted out" and omits GPU/UA when telemetry is off', () => {
        const body = buildIssueBody({
            ...base,
            includeTelemetry: false,
            gpuInfo: 'should not leak',
            userAgent: 'should not leak',
        });
        expect(body).toContain('Opted out');
        expect(body).not.toContain('should not leak');
    });

    it('uses "unavailable" when telemetry is on but gpuInfo is missing', () => {
        const body = buildIssueBody({ ...base, includeTelemetry: true });
        expect(body).toContain('GPU/Renderer:** unavailable');
    });
});
