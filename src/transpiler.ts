import * as fs from 'fs';
import {iolist_to_string} from 'iolist.js';
import * as util from 'util';
import {parseFile} from './parse';

export async function transpileFile (filename: string) {
    if (!filename.endsWith('.cs')) {
        console.error(`input file should be .cs`);
    }
    console.log(`reading ${filename}...`);
    const tree = await parseFile(filename);
    // console.debug('tree=', tree);
    const code = iolist_to_string(tree);
    const idlFilename = filename.replace('.cs', '.idl');
    if (code.length > 0) {
        await util.promisify(fs.writeFile)(idlFilename, code);
        console.log('saved to ' + idlFilename);
    } else {
        if (await util.promisify(fs.exists)(idlFilename)) {
            await util.promisify(fs.unlink)(idlFilename);
        }
    }
}
