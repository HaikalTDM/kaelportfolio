// Step 1 of GitHub OAuth for Decap CMS.
// Decap opens this in a popup; we bounce the user to GitHub to authorize.
export default function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('Missing OAUTH_GITHUB_CLIENT_ID environment variable.');
    return;
  }
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const redirectUri = `${proto}://${host}/api/callback`;
  const state = Math.random().toString(36).slice(2);
  const url =
    'https://github.com/login/oauth/authorize' +
    `?client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    '&scope=repo,user' +
    `&state=${state}`;
  res.writeHead(302, { Location: url });
  res.end();
}
