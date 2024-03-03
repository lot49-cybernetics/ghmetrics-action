import { exec } from 'child_process'

/**
 * Install repostat from its Git repository.
 * @returns {Promise<string>} Resolves with 'done!' after the wait is over.
 */
export async function install(
  version = 'latest',
  source = 'pypi'
): Promise<string> {
  return new Promise((resolve, reject) => {
    const pip_cmd = 'pip3 install --user --quiet'
    let install_cmd: string
    if (source === 'github') {
      let version_tag = ''
      if (version !== 'latest') {
        version_tag = `@${version}`
      }
      install_cmd = `${pip_cmd} git+https://github.com/vifactor/repostat${version_tag}`
    } else if (source === 'pypi') {
      install_cmd = `${pip_cmd} repostat${version !== 'latest' ? `==${version}` : ''}`
    } else {
      throw new Error('Invalid source')
    }
    exec(install_cmd, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Error installing package: ${error.message}`))
        return
      }
      if (stderr) {
        reject(new Error(`Error installing package: ${stderr}`))
        return
      }
      if (stdout) {
        console.warn(
          `Package installed (unexpected output in quiet mode): ${stdout}`
        )
      }
      resolve(`Package installed successfully`)
    })
  })
}
