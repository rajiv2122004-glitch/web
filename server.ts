import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface Inquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

const INQUIRIES_FILE = path.join(__dirname, 'inquiries.json');

const getInquiries = (): Inquiry[] => {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const data = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading inquiries:', err);
  }
  return [];
};

const saveInquiries = (inquiries: Inquiry[]) => {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving inquiries:', err);
  }
};

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'Rajiv Kumar H N Portfolio Backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/contact', (req: Request, res: Response) => {
  try {
    const { fullName, email, subject, message } = req.body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ success: false, error: 'Full name is required.' });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, error: 'A valid email address is required.' });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Subject is required.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ success: false, error: 'Message must be at least 5 characters.' });
    }

    const newInquiry: Inquiry = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const inquiries = getInquiries();
    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    return res.status(201).json({
      success: true,
      message: 'Message received and stored on the server.',
      inquiryId: newInquiry.id,
      timestamp: newInquiry.createdAt,
    });
  } catch (err: any) {
    console.error('Error in contact endpoint:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process inquiry on server.',
    });
  }
});

app.get('/api/contact/messages', (_req: Request, res: Response) => {
  const inquiries = getInquiries();
  res.json({
    success: true,
    count: inquiries.length,
    inquiries,
  });
});

app.delete('/api/contact/messages/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const inquiries = getInquiries();
  const filtered = inquiries.filter((inq) => inq.id !== id);
  saveInquiries(filtered);
  res.json({ success: true, message: `Inquiry ${id} deleted.` });
});

async function start() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server listening on http://0.0.0.0:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
