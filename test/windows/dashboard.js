import SpectronWindow from 'spectron-window'

export default class Dashboard extends SpectronWindow {
  // require
  get path () {
    return 'dashboard.html'
  }
}