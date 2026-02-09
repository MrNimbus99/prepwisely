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
    
    // Check if certificate already exists
    const existingCertKey = `certificates/${userId}/${certCode}.pdf`;
    try {
      await s3Client.send(new GetObjectCommand({
        Bucket: CERT_BUCKET,
        Key: existingCertKey
      }));
      
      // Certificate exists, return existing URL
      const downloadUrl = `https://${CERT_BUCKET}.s3.${REGION}.amazonaws.com/${existingCertKey}`;
      return {
        statusCode: 200,
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: true,
          downloadUrl,
          existing: true,
          certName: certificationNames[certCode] || certCode
        })
      };
    } catch (error) {
      // Certificate doesn't exist, generate new one
      if (error.name !== 'NoSuchKey') {
        throw error;
      }
    }

    const certName = certificationNames[certCode] || certCode;
    const completionDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    const serialNumber = `NC-${certCode}-${Date.now().toString(36).toUpperCase()}`;

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([842, 595]); // A4 landscape
    const { width, height } = page.getSize();

    // Embed fonts
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Colors
    const primaryBlue = rgb(0.2, 0.4, 0.8);
    const darkGray = rgb(0.2, 0.2, 0.2);
    const lightGray = rgb(0.5, 0.5, 0.5);
    const gold = rgb(0.85, 0.65, 0.13);

    // Draw border
    page.drawRectangle({
      x: 30,
      y: 30,
      width: width - 60,
      height: height - 60,
      borderColor: primaryBlue,
      borderWidth: 3,
    });

    page.drawRectangle({
      x: 35,
      y: 35,
      width: width - 70,
      height: height - 70,
      borderColor: gold,
      borderWidth: 1,
    });

    // Title
    page.drawText('CERTIFICATE OF COMPLETION', {
      x: width / 2 - 200,
      y: height - 100,
      size: 28,
      font: boldFont,
      color: primaryBlue,
    });

    // Subtitle
    page.drawText('This certifies that', {
      x: width / 2 - 70,
      y: height - 150,
      size: 14,
      font: regularFont,
      color: darkGray,
    });

    // Name (large and centered)
    const nameSize = 36;
    const nameWidth = boldFont.widthOfTextAtSize(userName, nameSize);
    page.drawText(userName, {
      x: width / 2 - nameWidth / 2,
      y: height - 210,
      size: nameSize,
      font: boldFont,
      color: darkGray,
    });

    // Underline for name
    page.drawLine({
      start: { x: width / 2 - nameWidth / 2 - 20, y: height - 220 },
      end: { x: width / 2 + nameWidth / 2 + 20, y: height - 220 },
      thickness: 2,
      color: gold,
    });

    // Achievement text
    page.drawText('has successfully completed the preparation program for', {
      x: width / 2 - 210,
      y: height - 260,
      size: 14,
      font: regularFont,
      color: darkGray,
    });

    // Certification name (wrapped if needed)
    const certLines = wrapText(certName, 60);
    let certY = height - 310;
    certLines.forEach(line => {
      const lineWidth = boldFont.widthOfTextAtSize(line, 20);
      page.drawText(line, {
        x: width / 2 - lineWidth / 2,
        y: certY,
        size: 20,
        font: boldFont,
        color: primaryBlue,
      });
      certY -= 25;
    });

    // NestedCerts branding
    page.drawText('NestedCerts', {
      x: width / 2 - 60,
      y: 120,
      size: 18,
      font: boldFont,
      color: primaryBlue,
    });

    page.drawText('Professional Certification Preparation', {
      x: width / 2 - 110,
      y: 100,
      size: 10,
      font: regularFont,
      color: lightGray,
    });

    // Date (bottom left)
    page.drawText('Date of Completion', {
      x: 80,
      y: 80,
      size: 10,
      font: boldFont,
      color: darkGray,
    });
    page.drawText(completionDate, {
      x: 80,
      y: 65,
      size: 10,
      font: regularFont,
      color: lightGray,
    });

    // Serial number (bottom right)
    page.drawText('Certificate ID', {
      x: width - 200,
      y: 80,
      size: 10,
      font: boldFont,
      color: darkGray,
    });
    page.drawText(serialNumber, {
      x: width - 200,
      y: 65,
      size: 10,
      font: regularFont,
      color: lightGray,
    });

    // Save PDF
    const pdfBytes = await pdfDoc.save();
    
    // Upload to S3 with fixed key (no timestamp)
    await s3Client.send(new PutObjectCommand({
      Bucket: CERT_BUCKET,
      Key: existingCertKey,
      Body: pdfBytes,
      ContentType: 'application/pdf',
      Metadata: {
        userId,
        certCode,
        serialNumber,
        generatedAt: new Date().toISOString()
      }
    }));

    const downloadUrl = `https://${CERT_BUCKET}.s3.${REGION}.amazonaws.com/${existingCertKey}`;

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
        certName,
        existing: false
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

function wrapText(text, maxLength) {
  if (text.length <= maxLength) return [text];
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';
  
  words.forEach(word => {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });
  if (currentLine) lines.push(currentLine);
  return lines;
}

async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
