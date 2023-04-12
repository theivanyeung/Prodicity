const { AGORA_APP_ID, AGORA_PRIMARY_CERTIFICATE } = process.env;

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res
      .status(200)
      .json({ appId: AGORA_APP_ID, certificate: AGORA_PRIMARY_CERTIFICATE });
  }
  return res.status(404).json({
    error: {
      code: "not_found",
      message: "The requested endpoint was not found or doesn't exist",
    },
  });
}
