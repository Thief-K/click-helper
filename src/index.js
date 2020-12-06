const INPUT_TIME = '2020-12-06 09:09:20'
const INPUT_DOM = '#J_babelOptPage > div > div.bab-opt-mod.bab-opt-mod-1_1.guanggao_beishu > div > a:nth-child(1) > div > img'
const INPUT_INTERVAL = 30

const targetTime = new Date(INPUT_TIME).getTime()
const dom = document.querySelector(INPUT_DOM)

let count = 0

const interval = setInterval(() => {
  const now = new Date().getTime()
  if (targetTime <= now) {
    count++
    dom.click()
    if (count > 5) clearInterval(interval)
  }
}, INPUT_INTERVAL)

class ClickHelper {
  constructor({ time, dom, delay }) {
    this.time = time
    this.dom = dom
    this.interval = interval
    this.init()
  }

  init() {}
}
