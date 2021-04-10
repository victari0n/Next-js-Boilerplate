import { NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, NextAuthRequest } from 'next-auth';

const tenantName = process.env.AUTH_TENANT_NAME;
//const tenantGuid = process.env.AUTH_TENANT_GUID
const userFlow = process.env.USER_FLOW;

const options: NextAuthOptions = {
  session: {
    jwt: true,
  },
  secret: process.env.JWT_SECRET,
  pages: {
    signOut: '/auth/signout',
  },
  providers: [
    {
      id: 'azureb2c',
      name: 'Azure B2C',
      type: 'oauth',
      version: '2.0',
      debug: true,
      scope: 'offline_access openid',
      params: {
        grant_type: 'authorization_code',
      },
      accessTokenUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/token`,
      // requestTokenUrl: `https://login.microsoftonline.com/${process.env.AUTH_TENANT_GUID}/oauth2/v2.0/token`,
      authorizationUrl: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${userFlow}/oauth2/v2.0/authorize?response_type=code+id_token&response_mode=form_post`,
      profileUrl: 'https://graph.microsoft.com/oidc/userinfo',
      profile: (profile, tokens) => {
        console.log('PROFILE', profile)
        console.log('TOKENS', tokens)

        return {
          id: profile.oid,
          name: profile.name,
          email: profile.emails.length ? profile.emails[0] : null,
        }
      },
      // @ts-ignore
      clientId: process.env.AUTH_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      idToken: true,
      state: false,
    },
  ],
}

export default (req: NextAuthRequest, res: NextApiResponse<any>) => NextAuth(req, res, options);