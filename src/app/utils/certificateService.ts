const CERTIFICATE_API_URL = 'https://yxa4lhwakg.execute-api.ap-southeast-2.amazonaws.com/prod/generate';

export async function generateCertificate(certCode: string, accessToken: string) {
  try {
    const response = await fetch(CERTIFICATE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, certCode }),
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
