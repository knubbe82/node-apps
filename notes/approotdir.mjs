import * as path from 'path';
import * as url from 'url';
const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
export const approotdir = dirname;