
export const runtime = "nodejs";
export async function GET() {
  return new Response(JSON.stringify({
    DB_USER: !!process.env.DB_USER,
    DB_HOST: !!process.env.DB_HOST,
  }));
}
