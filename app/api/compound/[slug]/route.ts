export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  return new Response(params.slug);
}
