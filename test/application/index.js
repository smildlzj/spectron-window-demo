const path = require('path')
const Application = require('spectron').Application

export function start () {
  var filePath = null
  if (process.platform == 'darwin') {
    filePath = path.join(process.cwd(), `/dist/mac/spectron-window-demo.app/Contents/MacOS/${PRODUCT_NAME}`)
  } else {
    filePath = path.join(process.cwd(), `/dist/win-${process.arch}-unpacked/spectron-window-demo.exe`)
  }

  return new Promise(async (resolve) => {
    var app = new Application({
      path: filePath,
      startTimeout: 15000,
      quitTimeout: 10000,
      waitTimeout: 20000
    })
    await app.start()
    await app.client.waitUntilWindowLoaded()
    resolve(app)
  })
}

export function close (app) {
  return app.stop()
}