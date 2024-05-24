import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

export const eden = treaty<App>(`${process.env.URL}:3000`);
