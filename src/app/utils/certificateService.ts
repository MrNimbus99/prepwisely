import { SignatureV4 } from '@aws-sdk/signature-v4';
import { Sha256 } from '@aws-crypto/sha256-js';
import { HttpRequest } from '@aws-sdk/protocol-http';

const CERTIFICATE_API_URL = import.meta.env.VITE_CERTIFICATE_API_URL || 
  'https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod/generate';

export async function generateCertificate(userId: string, certCode: string, credentials: any) {
  try {
    // Create the request
    const url = new URL(CERTIFICATE_API_URL);
    const request = new HttpRequest({
      method: 'POST',
      protocol: url.protocol.slice(0, -1),
      hostname: url.hostname,
      path: url.pathname,
      headers: {
        'Content-Type': 'application/json',
        'host': url.hostname,
      },
      body: JSON.stringify({ userId, certCode }),
    });

    // Sign the request with AWS Signature V4
    const signer = new SignatureV4({
      credentials,
      region: 'ap-southeast-2',
      service: 'execute-api',
      sha256: Sha256,
    });

    const signedRequest = await signer.sign(request);

    // Make the request
    const response = await fetch(CERTIFICATE_API_URL, {
      method: 'POST',
      headers: signedRequest.headers,
      body: signedRequest.body,
    });

    if (!response.ok) {
      throw new Error(`Failed to generate certificate: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw error;
  }
}

export function downloadCertificate(url: string, fileName: string) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
