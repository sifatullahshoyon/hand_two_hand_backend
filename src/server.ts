import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log(`Hand Two Hand Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error(error);
  }
}

// call the faction
main();
