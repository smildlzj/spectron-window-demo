import SpectronWindow from 'spectron-window'
import Dashboard from './dashboard'

export default class Login extends SpectronWindow {
  // require
  get path () {
    return 'login.html'
  }

  username (val) {
    if (val) {
      return this.browser.setValue('#username', val)
    } else {
      return this.browser.getValue('#username')
    }
  }

  password (val) {
    if (val) {
      return this.browser.setValue('#password', val)
    } else {
      return this.browser.getValue('#password')
    }
  }

  async login (u, p) {
    await this.username(u)
    await this.password(p)
    return this.submit()
  }

  async submit () {
    await this.click('#login-btn')
    return new Dashboard(this.app, this)
  }
}