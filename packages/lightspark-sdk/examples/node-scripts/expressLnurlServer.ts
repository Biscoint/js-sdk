// An example server which uses the lightspark-sdk to generate LNURL endpoints.

import {
  AccountTokenAuthProvider,
  LightsparkClient,
} from "@lightsparkdev/lightspark-sdk";
import express, { Request } from "express";
import { getCredentialsFromEnvOrThrow } from "./authHelpers.js";

////////////////////////////////////////////////////////
// MODIFY THESE VARIABLES BEFORE RUNNING THE EXAMPLE  //
////////////////////////////////////////////////////////
// We defined these variables as environment variables, but if you are just
// running the example locally, feel free to just set the values in code.
//
// First, initialize your client ID and client secret. Those are available
// in your account at https://app.lightspark.com/api_config
//
// export LIGHTSPARK_API_TOKEN_CLIENT_ID=<client_id>
// export LIGHTSPARK_API_TOKEN_CLIENT_SECRET=<client_secret>
const credentials = getCredentialsFromEnvOrThrow();

// This example also assumes you already know your node UUID. Generally, an LNURL API would serve
// many different usernames while maintaining some internal mapping from username to node UUID. For
// simplicity, this example works with a single username and node UUID.
//
// export LIGHTSPARK_LNURL_NODE_UUID=0187c4d6-704b-f96b-0000-a2e8145bc1f9
const LNURL_NODE_UUID = process.env.LIGHTSPARK_LNURL_NODE_UUID;
const LNURL_USERNAME = process.env.LIGHTSPARK_LNURL_USERNAME || "ls_test";
// To run the webserver, run this command from the examples/node_scripts directory:
// $ npm i
// $ ts-node expressLnurlServer.ts
//
// By default the server will run on port 3000. You can make a request to the API through
// curl to make sure the server is working properly (replace ls_test with the username you have
// configured):
//
// $ curl http://127.0.0.1:3000/.well-known/lnurlp/ls_test

type User = {
  uuid: string;
  username: string;
  nodeId: string;
};

export const LS_TEST_USER: User = {
  // Static UUID so that callback URLs are always the same.
  uuid: "4b41ae03-01b8-4974-8d26-26a35d28851b",
  username: LNURL_USERNAME,
  nodeId: `LightsparkNode:${LNURL_NODE_UUID}`,
};

const generate_callback_for_user = (request: Request, user: User): string => {
  return `${request.baseUrl}/api/lnurl/payreq/${user.uuid}`;
};

const generate_metadata_for_user = (user: User): string => {
  return JSON.stringify([
    ["text/plain", `Pay ${user.username} on Lightspark`],
    ["text/identifier", `${user.username}@domain.org`],
  ]);
};

const app = express();

app.get("/.well-known/lnurlp/:username", (req, res) => {
  const username = req.params.username;
  if (username !== LNURL_USERNAME) {
    res.status(404).send("Not found");
    return;
  }
  const callback = generate_callback_for_user(req, LS_TEST_USER);
  const metadata = generate_metadata_for_user(LS_TEST_USER);

  res.send({
    callback: callback,
    maxSendable: 10_000_000,
    minSendable: 1_000,
    metadata: metadata,
    tag: "payRequest",
  });
});

app.get("/api/lnurl/payreq/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  if (uuid !== LS_TEST_USER.uuid) {
    res.status(404).send("Not found");
    return;
  }
  const client = new LightsparkClient(
    new AccountTokenAuthProvider(
      credentials.apiTokenClientId,
      credentials.apiTokenClientSecret
    ),
    credentials.baseUrl
  );

  const amountMsats = parseInt(req.query.amountMsats as string);
  if (!amountMsats) {
    res.status(400).send("Missing amountMsats query parameter.");
    return;
  }

  const invoice = await client.createLnurlInvoice(
    LS_TEST_USER.nodeId,
    amountMsats,
    generate_metadata_for_user(LS_TEST_USER)
  );
  if (!invoice) {
    res.status(500).send("Invoice creation failed.");
    return;
  }
  res.send({ pr: invoice.data.encodedPaymentRequest, routes: [] });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
