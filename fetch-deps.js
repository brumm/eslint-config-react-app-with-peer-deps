const { exec } = require('child_process')
const fs = require('fs')

exec(
  'npm view eslint-config-react-app version peerDependencies -json',
  (error, stdout, stderr) => {
    if (error) {
      throw new Error(error)
    }

    const pkg = require('./package.json')
    const { version, peerDependencies } = JSON.parse(stdout)

    pkg.version = version
    pkg.dependencies = Object.assign({}, pkg.dependencies, peerDependencies)

    const data = JSON.stringify(pkg, null, 2)
    fs.writeFileSync('package.json', data)

    exec(
      `git add -A && git commit -m "update package to eslint-config-react-app ${version}" && git tag v${version}`
    )
  }
)
