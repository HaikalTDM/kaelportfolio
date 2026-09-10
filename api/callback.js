// Step 2 of GitHub OAuth for Decap CMS.
// GitHub redirects here with ?code=..., we swap it for a token and hand it
// back to the CMS window via postMessage (Decap's expected protocol).
export default async function handler(req, res) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = req.query.code;

  if (!clientId || !clientSecret) {
    res.status(500).send('Missing GitHub OAuth environment variables.');
    return;
  }
  if (!code) {
    res.status(400).send('Missing code from GitHub.');
    return;
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const data = await tokenRes.json();
  const token = data.access_token;

  if (!token) {
    res.status(401).send('GitHub did not return a token.');
    return;
  }

  const payload = JSON.stringify({ token, provider: 'github' });
  const html = `<!doctype html><html><body><script>
    (function () {
      function receiveMessage(e) {
        window.opener.postMessage('authorization:github:success:${payload}', e.origin);
        window.removeEventListener('message', receiveMessage, false);
      }
      window.addEventListener('message', receiveMessage, false);
      window.opener.postMessage('authorizing:github', '*');
    })();
  </script></body></html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
