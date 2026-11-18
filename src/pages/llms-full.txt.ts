import type { APIRoute } from 'astro';
import { llmsFull } from '../lib/llms';

export const GET: APIRoute = ({ site }) => new Response(llmsFull((path) => new URL(path, site).href), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
