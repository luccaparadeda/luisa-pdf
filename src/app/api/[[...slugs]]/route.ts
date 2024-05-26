// app/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { prisma } from "../../../../prisma/db";
import { env } from "node:process";

const app = new Elysia({ prefix: "/api" })
	.use(
		jwt({
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			secret: "teste",
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
		"/validateCookie",
		async ({ jwt, cookie, error, set }) => {
			console.log(cookie.auth.value);
			const isValid = await jwt.verify(cookie.auth.value);

			// console.log(cookie.auth);
			// console.log(isValid);

			if (!isValid) {
				return error(401, "Você não está autenticado");
			}

			const { email } = isValid;
			set.status = 200;
			return `Você está autenticado com o email: ${email}`;
		},
		{
			cookie: t.Cookie({
				auth: t.String(),
			}),
			response: {
				200: t.String(),
				401: t.String(),
			},
		},
	)
	.post(
		"/",
		async ({ body, cookie: { auth }, jwt, set }) => {
			console.log("cheguei");
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
			auth.value = token;
			auth.path = "/";
			auth.httpOnly = true;

			console.log(await jwt.verify(token));

			set.status = 201;
		},
		{
			body: t.Object({
				name: t.Optional(t.String()),
				lastName: t.Optional(t.String()),
				email: t.String({ format: "email" }),
			}),
		},
	);

export const GET = app.handle;
export const POST = app.handle;
export type App = typeof app;
