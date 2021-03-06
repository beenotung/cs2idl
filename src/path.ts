export function getDir (fullpath: string): string {
    const ss = fullpath.split('/');
    ss.pop();
    return ss.join('/');
}

export function csToIdlFilename (csFilename: string, moduleName: string): string {
    const ss = csFilename.split('/');
    const filename = ss.pop();
    const dir = ss.join('/');
    return dir + '/' + moduleName + '/' + filename.replace(/\.cs$/, '.idl');
}

export function toRelativeFilename (sourceFilename: string, selfFilename: string): string {
    const srcs = sourceFilename.split('/');
    const selfs = selfFilename.split('/');
    const res = selfFilename.split('/');
    if (selfs.length === srcs.length) {
        for (let idx = 0; idx < res.length; idx++) {
            if (selfs[idx] === srcs[idx]) {
                res[idx] = '.';
                continue;
            }
            break;
        }
    }
    return res.join('/');
}
