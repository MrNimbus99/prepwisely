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

export async function downloadCertificate(url: string, fileName: string) {
  try {
    // Fetch the file as a blob
    const response = await fetch(url);
    const blob = await response.blob();
    
    // Create object URL
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Create and trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  } catch (error) {
    console.error('Download failed:', error);
    // Fallback to opening in new tab
    window.open(url, '_blank');
  }
}
