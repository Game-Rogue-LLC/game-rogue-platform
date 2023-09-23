import plaidClient from "@/lib/plaid/PlaidClient";

export default async function handler(req, res) {
  try {
    const response = await plaidClient.getBalance(req.body.access_token).catch((err) => {
      // handle error
      console.log(err);
    });
    //const accounts = response.accounts;
    res.json({
      code: "succeed",
      accounts: response.accounts
    });
  } catch (e) {
    res.status(200).json({ code: "failed", message: e.message });
  }
}
