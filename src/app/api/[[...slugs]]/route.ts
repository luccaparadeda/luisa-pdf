// app/[[...slugs]]/route.ts
import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { prisma } from "../../../../prisma/db";
import { env } from "node:process";

const app = new Elysia({ prefix: "/api" })
	.use(
		jwt({
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			secret: env.JWT_SECRET!,
			name: "jwt",
			schema: t.Object({ email: t.String({ format: "email" }) }),
		}),
	)
	.get(
		"/validateCookie",
		async ({ jwt, cookie: { auth }, error, set }) => {
			const isValid = await jwt.verify(auth.value);

			if (!isValid) {
				return error(401, "Você não está autenticado");
			}

			const { email } = isValid;
			set.status = 200;
			return `Você está autenticado com o email: ${email}`;
		},
		{
			cookie: t.Object({ auth: t.String() }),
			response: {
				200: t.String(),
				401: t.String(),
			},
		},
	)
	.post(
		"/",
		async ({ body, cookie: { auth }, jwt, set }) => {
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

			auth.set({
				value: await jwt.sign({ email: user.email }),
				httpOnly: true,
				maxAge: 60 * 60 * 24 * 7,
			});

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
