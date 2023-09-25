export default {
  oidc: {
    issuer: "https://dev-77263980.okta.com/oauth2/default",
    clientId: "0oabgt3verULBYnah5d7",
    scopes: ["openid", "profile", "email"],
    redirectUri: `${window.location.origin}/login/callback`,
  },
  widget: {
    issuer: "https://dev-77263980.okta.com/oauth2/default",
    clientId: "0oabgt3verULBYnah5d7",
    redirectUri: `${window.location.origin}/login/callback`,
    scopes: ["openid", "profile", "email"],
  },
};
