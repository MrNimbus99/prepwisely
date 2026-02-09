import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const REGION = process.env.AWS_REGION || 'ap-southeast-2';
const s3Client = new S3Client({ region: REGION });
const cognitoClient = new CognitoIdentityProviderClient({ region: REGION });

const CERT_BUCKET = process.env.CERT_BUCKET;
const TEMPLATE_BUCKET = process.env.TEMPLATE_BUCKET;

const certificationNames = {
  'CLF-C02': 'AWS Certified Cloud Practitioner',
  'AIF-C01': 'AWS Certified AI Practitioner',
  'SAA-C03': 'AWS Certified Solutions Architect – Associate',
  'DVA-C02': 'AWS Certified Developer – Associate',
  'SOA-C03': 'AWS Certified SysOps Administrator – Associate',
  'DEA-C01': 'AWS Certified Data Engineer – Associate',
  'MLA-C01': 'AWS Certified Machine Learning Engineer – Associate',
  'SAP-C02': 'AWS Certified Solutions Architect – Professional',
  'DOP-C02': 'AWS Certified DevOps Engineer – Professional',
  'AIP-C01': 'AWS Certified Generative AI Developer – Professional',
  'ANS-C01': 'AWS Certified Advanced Networking – Specialty',
  'SCS-C03': 'AWS Certified Security – Specialty',
  'MLS-C01': 'AWS Certified Machine Learning – Specialty'
};

export const handler = async (event) => {
  try {
    const { accessToken, certCode } = JSON.parse(event.body);
    
    if (!accessToken || !certCode) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Missing accessToken or certCode' })
      };
    }

    // Get user details from Cognito using access token
    const userResult = await cognitoClient.send(new GetUserCommand({
      AccessToken: accessToken
    }));

    // Extract name from Cognito attributes
    const attributes = userResult.UserAttributes || [];
    const nameAttr = attributes.find(attr => attr.Name === 'name');
    const givenNameAttr = attributes.find(attr => attr.Name === 'given_name');
    const familyNameAttr = attributes.find(attr => attr.Name === 'family_name');
    
    let userName = 'Certificate Holder';
    if (nameAttr?.Value) {
      userName = nameAttr.Value;
    } else if (givenNameAttr?.Value && familyNameAttr?.Value) {
      userName = `${givenNameAttr.Value} ${familyNameAttr.Value}`;
    } else if (givenNameAttr?.Value) {
      userName = givenNameAttr.Value;
    }

    const userId = userResult.Username;
    const certName = certificationNames[certCode] || certCode;
    const completionDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const serialNumber = `NC-${certCode}-${Date.now().toString(36).toUpperCase()}`;

    // Load template PDF from S3
    const templateResponse = await s3Client.send(new GetObjectCommand({
      Bucket: TEMPLATE_BUCKET,
      Key: 'Certificate/nestedcerts_simple_colored_certificate.pdf'
    }));
    
    const templateBytes = await streamToBuffer(templateResponse.Body);
    const pdfDoc = await PDFDocument.load(templateBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    // Embed fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Draw text on certificate
    // Name (centered, larger)
    firstPage.drawText(userName, {
      x: width / 2 - (userName.length * 12),
      y: height / 2 + 40,
      size: 32,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.5)
    });

    // Certification title (centered)
    const certTitleSize = 18;
    const certTitleWidth = certName.length * (certTitleSize * 0.5);
    firstPage.drawText(certName, {
      x: width / 2 - certTitleWidth / 2,
      y: height / 2 - 20,
      size: certTitleSize,
      font: regularFont,
      color: rgb(0.3, 0.3, 0.3)
    });

    // Date (bottom left)
    firstPage.drawText(`Date: ${completionDate}`, {
      x: 50,
      y: 80,
      size: 12,
      font: regularFont,
      color: rgb(0.4, 0.4, 0.4)
    });

    // Serial number (bottom right)
    const serialText = `Serial: ${serialNumber}`;
    firstPage.drawText(serialText, {
      x: width - 250,
      y: 80,
      size: 12,
      font: regularFont,
      color: rgb(0.4, 0.4, 0.4)
    });

    // Save modified PDF
    const pdfBytes = await pdfDoc.save();
    
    // Upload to S3
    const s3Key = `certificates/${userId}/${certCode}-${Date.now()}.pdf`;
    await s3Client.send(new PutObjectCommand({
      Bucket: CERT_BUCKET,
      Key: s3Key,
      Body: pdfBytes,
      ContentType: 'application/pdf',
      Metadata: {
        userId,
        certCode,
        serialNumber,
        generatedAt: new Date().toISOString()
      }
    }));

    const downloadUrl = `https://${CERT_BUCKET}.s3.${REGION}.amazonaws.com/${s3Key}`;

    return {
      statusCode: 200,
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        downloadUrl,
        serialNumber,
        certName
      })
    };

  } catch (error) {
    console.error('Error generating certificate:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: error.message })
    };
  }
};

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
