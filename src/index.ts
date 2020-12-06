class ClickHelper {
  private time: number
  private dom: HTMLElement = null
  private delay: number
  private interval: NodeJS.Timeout

  constructor(time: string, dom: string, delay = 30) {
    this.time = new Date(time).getTime()
    this.dom = document.querySelector(dom)
    this.delay = delay
    this.init()
  }

  init() {
    let count = 0
    this.interval = setInterval(() => {
      const now = new Date().getTime()
      if (this.time <= now) {
        count++
        this.dom.click()
        if (count > 5) {
          this.destroy()
        }
      }
    }, this.delay)
  }

  destroy() {
    clearInterval(this.interval)
    this.interval = null
  }
}

const root = document.querySelector('body')
const htmlStr = `
<div id="helper-panel" style="width: 300px; position: fixed; top: 100px; right: -268px; display: flex;">
  <div style="height: 100%;">
    <button id="helper-panel-button" type="button" class="btn btn-info btn-sm">
      <svg id="icon-left" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
      <svg id="icon-right" style="display: none;" width="1em" height="1em" viewBox="0 0 16 16"
        class="bi bi-chevron-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </button>
  </div>
  <div style="flex: 1;">
    <div class="card">
      <div class="card-body">
        <div class="input-group input-group-sm">
          <input id="helper-panel-time" type="text" class="form-control" placeholder="时间">
          <input id="helper-panel-dom" type="text" class="form-control" placeholder="元素">
          <input id="helper-panel-delay" type="text" class="form-control" placeholder="间隔">
          <button id="helper-panel-button-check" type="button" class="btn btn-link btn-sm">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-check2" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
`
root.appendChild(document.createElement('div')).innerHTML = htmlStr

function toggle() {
  const panel = document.querySelector('#helper-panel') as HTMLElement
  const iconLeft = document.querySelector('#icon-left') as HTMLElement
  const iconRight = document.querySelector('#icon-right') as HTMLElement
  if (!toggleFlag) {
    panel.style.right = '0px'
    iconLeft.style.display = 'none'
    iconRight.style.display = 'inline'
  } else {
    panel.style.right = '-268px'
    iconLeft.style.display = 'inline'
    iconRight.style.display = 'none'
  }
  toggleFlag = !toggleFlag
}

function execute() {
  const time = document.querySelector('#helper-panel-time') as HTMLInputElement
  const dom = document.querySelector('#helper-panel-dom') as HTMLInputElement
  const delay = document.querySelector('#helper-panel-delay') as HTMLInputElement
  new ClickHelper(time.value, dom.value, Number(delay.value))
}

let toggleFlag = false

// const html = document.querySelector('html')
// html.onclick = (e) => {
//   if ((e.target as HTMLElement).nodeName !== 'svg' || !toggleFlag) return
//   toggleFlag = true
//   toggle()
// }

const panelButton = document.querySelector('#helper-panel-button') as HTMLElement
panelButton.onclick = (e) => {
  e.preventDefault()
  toggle()
}

const checkButton = document.querySelector('#helper-panel-button-check') as HTMLElement
checkButton.onclick = (e) => {
  e.preventDefault()
  execute()
}
