import { fileToBuffer } from '../utils/fileToBuffer';
import * as streamBuffers from 'stream-buffers';

export async function streamBufferToMulterFile(
  path: string,
): Promise<Express.Multer.File> {
  const salesFile = (await fileToBuffer(path)) as Buffer;

  const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 10, // in milliseconds.
    chunkSize: 2048, // in bytes.
  });
  myReadableStreamBuffer.put(salesFile as Buffer);

  return {
    buffer: salesFile,
    fieldname: 'fieldname-defined-in-@UseInterceptors-decorator',
    originalname: 'original-filename',
    encoding: '7bit',
    mimetype: 'file-mimetyp',
    destination: 'destination-path',
    filename: 'file-name',
    path: 'file-path',
    size: 955578,
    stream: myReadableStreamBuffer,
  };
}
