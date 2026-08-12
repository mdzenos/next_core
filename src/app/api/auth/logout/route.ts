import { apiOk } from "@/lib/http/response";
import { clearSessionToken } from "@/server/auth/session";

export async function POST() {
  await clearSessionToken();
  return apiOk({ loggedOut: true });
}
