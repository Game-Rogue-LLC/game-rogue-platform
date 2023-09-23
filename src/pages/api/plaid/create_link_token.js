import plaidClient from "@/lib/plaid/PlaidClient";

export default async function handler(req, res) {
  try {
    // 1. Grab the client_user_id by searching for the current user in your database
    // const user = "testUser";
    const clientUserId = process.env.NEXT_PUBLIC_PLAID_CLIENT_ID;
    console.log(clientUserId);
    // 2. Create a link_token for the given user
    const linkTokenResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: clientUserId
      },
      client_name: "My App",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en"
    });
    const link_token = linkTokenResponse.data.link_token;
    // 3. Send the data to the client
    res.json({
      code: 'succeed',
      link_token
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({ code: "failed", message: e.message });
  }
}
