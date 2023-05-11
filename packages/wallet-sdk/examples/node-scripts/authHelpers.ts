// Copyright ©, 2023-present, Lightspark Group, Inc. - All Rights Reserved

export type EnvCredentials = {
  accountId: string;
  jwt: string;
  pubKey?: string;
  privKey?: string;
  baseUrl: string;
  jwtSigningPrivateKey?: string;
};

export const getCredentialsFromEnvOrThrow = (): EnvCredentials => {
  const accountId = process.env["LIGHTSPARK_ACCOUNT_ID"];
  const jwt = process.env["LIGHTSPARK_JWT"];
  const pubKey = process.env["LIGHTSPARK_WALLET_PUB_KEY"];
  const privKey = process.env["LIGHTSPARK_WALLET_PRIV_KEY"];
  const jwtSigningPrivateKey = process.env["LIGHTSPARK_JWT_PRIV_KEY"];
  const baseUrl =
    process.env["LIGHTSPARK_EXAMPLE_BASE_URL"] || "api.lightspark.com";
  if (!accountId || !jwt) {
    throw new Error(
      "Missing test credentials. Please set LIGHTSPARK_ACCOUNT_ID and LIGHTSPARK_JWT."
    );
  }
  return {
    accountId,
    jwt,
    pubKey,
    privKey,
    baseUrl,
    jwtSigningPrivateKey,
  };
};
