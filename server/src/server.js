import app from './app.js';
import { connectToDatabase } from './config/db.js';
import { config } from './config/env.js';

async function start() {
  try {
    await connectToDatabase();
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`API listening on port ${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
