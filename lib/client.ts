"use client";
import { authClient } from "./auth-client";

export async function getClientSession() {
	const session = await authClient.getSession();
	return session;
}

export async function getClientAuth() {
	const session = await authClient.getSession();
	const user = session?.data?.user || null;
	return { session, user };
}

