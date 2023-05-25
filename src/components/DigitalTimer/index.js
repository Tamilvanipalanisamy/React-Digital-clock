import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerLimit: 25,
    currentRunningSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
  }

  startTimerCountDown = () => {
    const {currentRunningSeconds, timerLimit} = this.state
    const isTimeCompleted = currentRunningSeconds === timerLimit * 60

    if (isTimeCompleted) {
      this.clearTimer()
      this.setState({isTimerRunning: false, currentRunningSeconds: 0})
    } else {
      this.setState(prevState => ({
        currentRunningSeconds: prevState.currentRunningSeconds + 1,
      }))
    }
  }

  startPauseButton = () => {
    const {isTimerRunning, currentRunningSeconds, timerLimit} = this.state
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))

    const isTimeCompleted = currentRunningSeconds === timerLimit * 60

    if (isTimeCompleted) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    }
    if (isTimerRunning) {
      this.clearTimer()
      this.setState({isTimerRunning: false})
    } else {
      this.intervalId = setInterval(() => {
        this.startTimerCountDown()
      }, 1000)
    }
  }

  onClickResetButton = () => {
    this.setState({
      isTimerRunning: false,
      currentRunningSeconds: 0,
      timerLimit: 25,
    })
    this.clearTimer()
  }

  increaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  decreaseTimerLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit - 1,
    }))
  }

  convertTimeToTimerFormat = () => {
    const {currentRunningSeconds, timerLimit} = this.state
    const totalSeconds = timerLimit * 60 - currentRunningSeconds
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    const minutesInStringFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsInStringFormat = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesInStringFormat}:${secondsInStringFormat}`
  }

  render() {
    const {isTimerRunning, timerLimit, currentRunningSeconds} = this.state
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const imageAlt = isTimerRunning ? 'pause icon' : 'play icon'
    const startPauseText = isTimerRunning ? 'Pause' : 'Start'
    const timerStatusText = isTimerRunning ? 'Running' : 'Paused'

    const isButtonDisabled = currentRunningSeconds > 0

    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="display-timer-container">
          <div className="timer-container">
            <div className="timer-block">
              <h1 className="timer-format">
                {this.convertTimeToTimerFormat()}
              </h1>
              <p className="timer-status">{timerStatusText}</p>
            </div>
          </div>
          <div className="timer-control-container">
            <div className="timer-control-options">
              <div>
                <button
                  type="button"
                  className="button"
                  onClick={this.startPauseButton}
                >
                  <div className="start-pause-option">
                    <img src={imageUrl} alt={imageAlt} className="icon" />
                    <p className="button-text">{startPauseText}</p>
                  </div>
                </button>
              </div>
              <div className="reset-option">
                <div>
                  <button
                    type="button"
                    className="button"
                    onClick={this.onClickResetButton}
                  >
                    <div className="start-pause-option">
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                        alt="reset icon"
                        className="icon"
                      />
                      <p className="button-text">Reset</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div className="set-timer-limit">
              <p className="timer-limit-text">Set Timer Limit</p>
              <div className="set-timer-button-style">
                <button
                  type="button"
                  className="button"
                  onClick={this.decreaseTimerLimit}
                  disabled={isButtonDisabled}
                >
                  -
                </button>
                <p className="timer-limit-button">{timerLimit}</p>
                <button
                  type="button"
                  className="button"
                  onClick={this.increaseTimerLimit}
                  disabled={isButtonDisabled}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
