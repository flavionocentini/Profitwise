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

			// Gettind data
			if (request.method === "GET") {
				const response = await fetch(
					`${env.SUPABASE_URL}/rest/v1/settings?select=*`,
					{
						headers: {
							apiKey: env.SUPABASE_SECRET_KEY,
							Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`
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

			// Updating data
			if (request.method === "PATCH") {
				const updates: unknown = await request.json();

				// Check if the data is valid JSON
				if (typeof updates !== "object" || updates === null || Array.isArray(updates)) {
					return Response.json(
						{ error: "Expected a JSON object" },
						{ status: 400 }
					);
				}

				// Make sure the fields are valid
				const allowedFields = [
					"revenue_per_order",
					"cogs",
					"fees_percentage",
					"commissions_percentage",
					"vat_percentage",
					"shipping"
				]

				for (const field of Object.keys(updates)) {
					if (!allowedFields.includes(field)) {
						return Response.json(
							{ error: `Unknown field: ${field}` },
							{ status: 400 }
						);
					}
				}

				// Make sure the values are numbers
				for (const [field, value] of Object.entries(updates)) {
					if (typeof value !== "number" || !Number.isFinite(value)) {
						return Response.json(
							{ error: `${field} must be a valid number` },
							{ status: 400 }
						);
					}
				}

				// Make sure the % are 0-100
				const percentages = [
					"fees_percentage",
					"commissions_percentage",
					"vat_percentage"
				];

				for (const field of percentages) {
					const value = (updates as Record<string, number>)[field];
					if (typeof value === "number" && (value < 0 || value > 100)) {
						return Response.json(
							{ error: `${field} must be between 0 and 100` },
							{ status: 400 }
						);
					}
				}

				// Make sure revenue_per_order, cogs and shipping aren't negative
				const nonNegativeFields = [
					"revenue_per_order",
					"cogs",
					"shipping"
				];

				for (const field of nonNegativeFields) {
					const value = (updates as Record<string, number>)[field];
					if (typeof value === "number" && value < 0) {
						return Response.json(
							{ error: `${field} cannot be negative` },
							{ status: 400 }
						);
					}
				}

				// Make sure the request has at least 1 field to update
				if (Object.keys(updates).length === 0) {
					return Response.json(
						{ error: "No fields to update" },
						{ status: 400 }
					);
				}

				// Update Supabase
				const response = await fetch(
					`${env.SUPABASE_URL}/rest/v1/settings?id=eq.1`,
					{
						method: "PATCH",
						headers: {
							apiKey: env.SUPABASE_SECRET_KEY,
							Authorization: `Bearer ${env.SUPABASE_SECRET_KEY}`,
							"Content-Type": "application/json",
							Prefer: "return=representation"
						},
						body: JSON.stringify(updates)
					}
				);

				if (!response.ok) {
					return Response.json(
						{ error: "Failed to update settings" },
						{ status: 500 }
					);
				}

				const data = await response.json() as Settings[];
				return Response.json(data[0]);
			}

		}

		return Response.json(
			{ error: "Not found" },
			{ status: 404 }
		);
	},
} satisfies ExportedHandler<Env>;
