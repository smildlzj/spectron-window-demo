import * as application from './application'
import LoginWin from './windows/login'
import { expect } from 'chai'

describe('Login Test', function () {
  this.timeout(10000)

  before(async function () {
    this.app = await application.start()
    this.loginWin = new LoginWin(this.app)
  })

  it('login fail', async function () {
    let loginWin = this.loginWin
    let dashboardWin = await loginWin.login('123', '123')
    expect(await loginWin.isExist(), 'login exist').to.be.true
    expect(await loginWin.browser.getText('#msg'), 'alert text').to.equal('username or password is wrong.')
    expect(await dashboardWin.isExist(), 'dashboard exist').to.be.false
  })

  it('login success', async function () {
    let loginWin = this.loginWin
    let dashboardWin = await loginWin.login('admin', 'admin')
    expect(await loginWin.isExist(), 'login exist').to.be.false
    expect(await dashboardWin.isExist(), 'dashboard exist').to.be.true
  })

  after(function () {
    application.close(this.app)
  })
})