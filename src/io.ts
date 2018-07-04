import * as fs from 'fs';
import {iolist_to_string} from 'iolist.js';
import * as util from 'util';
import {csToIdlFilename, getDir} from './path';

export type one_or_more<T> = T | T[];
export type iolist = Array<one_or_more<string>>;

export async function writeToFile (iolist: iolist, csFilename: string, moduleName: string) {
    const idlFilename = csToIdlFilename(csFilename, moduleName);
    const dir = getDir(idlFilename);
    if (!await util.promisify(fs.exists)(dir)) {
        await util.promisify(fs.mkdir)(dir);
    }
    await util.promisify(fs.writeFile)(idlFilename, iolist_to_string(iolist));
    console.log(`saved to ${idlFilename}`);
}
