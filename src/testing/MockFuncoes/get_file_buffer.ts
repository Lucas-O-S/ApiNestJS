import { createReadStream, existsSync, ReadStream } from 'fs';

export const getFileToBuffer = (filename: string) => {
  if (!existsSync(filename)) {
    throw new Error(`File not found: ${filename}`);
  }

  const readStream = createReadStream(filename);
  const chunks = [];

  return new Promise<{ buffer: Buffer; stream: ReadStream }>(
    (resolve, reject) => {
      readStream.on('data', (chunk) => chunks.push(chunk));
      readStream.on('error', (err) => reject(err));
      readStream.on('close', () => {
        resolve({
          buffer: Buffer.concat(chunks) as Buffer,
          stream: readStream,
        });
      });
    },
  );
};
