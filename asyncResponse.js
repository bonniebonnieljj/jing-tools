const config = {
    interval: 3
}

let _instance = null
class Refresh {
    constructor(fn) {
        if(!_instance) {
            _instance = fn
            this.cb = fn
        } else {
            throw new Error('已创建过实例')
        }
    }

    start() {
        this._reset()
    }

    stop() {
        this._reset(true)
        _instance = null
    }

    _reset(close) {
        if(this.interval) {
            clearInterval(this.interval)
            this.interval = null
        }
        if(close) return
        this.interval = setInterval(() => {
            this._intervalFn()
        }, 1000 * config.interval)
    }

    _intervalFn() {
        const timeStep = new Date().getTime()
        this._timeStep = timeStep//需要提前
        this.cb(timeStep)
    }

    timeStep() {
        return this._timeStep
    }
}

export default Refresh

/*
* const op = new Refresh(fn)
* op.start()
* const timestep = op.timeStep()
*
* todo 时间戳的设置时间有问题
* */
