import { exec } from 'child_process';

/**
 * Install repostat from its Git repository.
 * @returns {Promise<string>} Resolves with 'done!' after the wait is over.
 */
export async function install(version: string = 'latest', source: string = 'pypi'): Promise<string> {
  return new Promise(resolve => {
    let install_cmd: string;
    if (source === 'github') {
      let version_tag: string = '';
      if (version !== 'latest') {
        version_tag = `@${version}`;
      }
      install_cmd = `pip3 install git+https://github.com/vifactor/repostat${version_tag}`;
    } else if (source === 'pypi') {
      install_cmd = `pip3 install repostat${version !== 'latest' ? '==' + version : ''}`;
    } else {
      throw new Error('Invalid source')
    }
    exec(install_cmd, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error installing package: ${error.message}`);
          return;
      }
      if (stderr) {
          console.error(`Error installing package: ${stderr}`);
          return;
      }
      console.log(`Package installed successfully: ${stdout}`);
  });
  })
}
