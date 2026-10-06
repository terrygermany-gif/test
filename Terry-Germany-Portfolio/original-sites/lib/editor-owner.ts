// Compared only against the identity supplied by the Sites dispatcher.
import { getChatGPTUser } from "@/app/chatgpt-auth";
const ownerEmail = "terry.germany@gmail.com";
export async function isPortfolioOwner() {
  const user = await getChatGPTUser();
  return !!user && user.email.toLowerCase() === ownerEmail;
}
