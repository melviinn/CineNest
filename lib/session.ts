import { headers } from "next/headers";
import { auth } from "./auth";
import { getClientAuth } from "./client";

export async function getServerSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	return session;
}
// const session = await getServerSession();

export async function getServerAuth() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});
	const user = session?.user || null;
	return { session, user };
}
// const { session, user } = await getServerAuth();

export async function getAuth() {
	if (typeof window === "undefined") { // server side
		return getServerAuth();
	} else {
		return getClientAuth();
	}
}
