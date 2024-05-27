// app/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { prisma } from "../../../../prisma/db";

const app = new Elysia({ prefix: "/api" })
	.use(
		jwt({
			secret: process.env.JWT_SECRET ?? "",
			name: "jwt",
			schema: t.Object({ email: t.String({ format: "email" }) }),
		}),
	)
	.onAfterHandle(({ request, set }) => {
		// Only process CORS requests
		if (request.method !== "OPTIONS") return;

		const allowHeader = set.headers["Access-Control-Allow-Headers"];
		if (allowHeader === "*") {
			set.headers["Access-Control-Allow-Headers"] =
				request.headers.get("Access-Control-Request-Headers") ?? "";
		}
	})
	.get(
		"/validateCookie/:token",
		async ({ error, set, params, jwt }) => {
			const isValid = await jwt.verify(params.token);
			console.log({ isValid });
			if (!isValid) {
				return error(401, "Você não está autenticado");
			}

			const { email } = isValid;
			set.status = 200;
			return `Você está autenticado com o email: ${email}`;
		},
		{
			response: {
				200: t.String(),
				401: t.String(),
			},
			params: t.Object({
				token: t.String(),
			}),
		},
	)
	.post(
		"/",
		async ({ body, set, jwt }) => {
			const user = await prisma.user.upsert({
				where: {
					email: body.email,
				},
				update: {},
				create: {
					email: body.email,
					name: body.name,
					lastName: body.lastName,
				},
			});

			const token = await jwt.sign({ email: user.email });

			set.status = 201;
			return token;
		},
		{
			body: t.Object({
				name: t.Optional(t.String()),
				lastName: t.Optional(t.String()),
				email: t.String({ format: "email" }),
			}),

			response: {
				201: t.String(),
			},
		},
	);

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export type App = typeof app;
