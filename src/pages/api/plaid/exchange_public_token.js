import plaidClient from "@/lib/plaid/PlaidClient";

export default async function handler(req, res) {
  try {
    //public token cant be found
    const response = await plaidClient
      .exchangePublicToken(req.body.public_token)
      .catch((err) => {
        console.log(err);
      });
    const accessToken = response.access_token;
    const itemId = response.item_id;
    // ACCESS_TOKEN = response.access_token;
    // ITEM_ID = response.item_id;
    res.json({
      code: "succed",
      access_token: accessToken,
      item_id: itemId
    });
    console.log("access token below: ", accessToken);
  } catch (e) {
    res.status(200).json({ code: "failed", message: e.message });
  }
}
