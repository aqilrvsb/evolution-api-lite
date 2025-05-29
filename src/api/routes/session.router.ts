import { Router, Request, Response } from 'express';
import { SessionService } from '../services/session.service';

const sessionRouter = Router();

sessionRouter.post('/sessions/start', async (req: Request, res: Response) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    return res.status(400).json({ error: 'sessionId is required' });
  }

  try {
    await SessionService.startSession(sessionId);
    return res.status(200).json({ status: 'started', sessionId });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to start session' });
  }
});

sessionRouter.get('/sessions/qr/:sessionId', async (req: Request, res: Response) => {
  const sessionId = req.params.sessionId;

  try {
    const qr = await SessionService.getQRCode(sessionId);
    if (!qr) {
      return res.status(404).json({ error: 'QR not available' });
    }
    return res.status(200).json({ qr });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Failed to get QR code' });
  }
});

export { sessionRouter };
