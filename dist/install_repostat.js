"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.install = void 0;
const child_process_1 = require("child_process");
/**
 * Install repostat from its Git repository.
 * @returns {Promise<string>} Resolves with 'done!' after the wait is over.
 */
async function install(version = 'latest', source = 'pypi') {
    return new Promise((resolve, reject) => {
        const pip_cmd = 'pip3 install --user --quiet';
        const git_repo = 'https://github.com/vifactor/repostat';
        let install_cmd;
        if (source === 'github') {
            let version_tag = '';
            if (version !== 'latest') {
                version_tag = `@${version}`;
            }
            install_cmd = `${pip_cmd} git+${git_repo}${version_tag}`;
        }
        else if (source === 'pypi') {
            let version_tag = ``;
            if (version === 'latest') {
                version_tag = `==${version}`;
            }
            install_cmd = `${pip_cmd} repostat${version_tag}`;
        }
        else {
            throw new Error('Invalid source');
        }
        (0, child_process_1.exec)(install_cmd, (error, stdout, stderr) => {
            if (error) {
                reject(new Error(`Error installing package: ${error.message}`));
                return;
            }
            if (stderr) {
                reject(new Error(`Error installing package: ${stderr}`));
                return;
            }
            if (stdout) {
                console.warn(`Package installed (unexpected output in quiet mode): ${stdout}`);
            }
            resolve(`Package installed successfully`);
        });
    });
}
exports.install = install;
//# sourceMappingURL=install_repostat.js.map