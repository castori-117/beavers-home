import type { APIRoute } from 'astro';
import { llmsIndex } from '../lib/llms';

export const GET: APIRoute = ({ site }) => new Response(llmsIndex((path) => new URL(path, site).href), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
