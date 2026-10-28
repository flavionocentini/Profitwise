type Settings = {
	id: number;
	revenue_per_order: number;
	cogs: number;
	fees_percentage: number;
	commissions_percentage: number;
	vat_percentage: number;
	shipping: number;
};

export default {
	async fetch(request, env: Env, ctx): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/api/settings") {

			if (request.method === "GET") {
				const response = await fetch(
					`${env.SUPABASE_URL}/rest/v1/settings?select=*`,
					{
						headers: {
							apiKey: env.SUPABASE_SECRET_KEY,
							Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
						},
					}
				);
				
				if (!response.ok) {
					return Response.json(
						{ error: "Failed to fetch settings" },
						{ status: 500 }
					);
				}

				const data = await response.json() as Settings[];
				return Response.json(data[0]);
			}

			if (request.method === "PATCH") {
				const updates = await request.json();
				return Response.json(updates);
			}

		}

		return Response.json({ message: "Not found" });
	},
} satisfies ExportedHandler<Env>;
