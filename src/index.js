import React from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react'
import axios from 'axios'
import uuid from 'uuid/v1'

let baseUrl = 'https://identity.mayersoftwaredevelopment.nl'
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5010'
}
let baseUrlFrontend = 'https://identity.mayersoftwaredevelopment.nl'
if (process.env.NODE_ENV === 'development') {
  baseUrlFrontend = 'http://localhost:3010'
}
let baseUrlApp = 'identity://kvk.nl'
let pollTries = 0
let maxAmountofPolls = 150 // 360

function mobileCheck () {
  let check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
  })(navigator.userAgent || navigator.vendor || window.opera)
  return check
}

class IdentityQR extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      question: []
    }
    this.isMobile = mobileCheck()
  }

  showQRHandler = (linkTo) => {
    // window.open(`${baseUrlApp}/attest/eb98b290-2b6e-11e8-9b0e-a332084f452c`)

    let sessionKey
    if (this.isMobile && linkTo !== 'web') {
      sessionKey = this.sessionKey = uuid()
      window.open(`${baseUrlApp}/attest/${this.sessionKey}`)
    }

    axios.post(`${baseUrl}/api/session`, {
      questionId: this.props.questionId,
      sessionKey
    }).then(sessionResponse => {
      let session = sessionResponse.data
      this.sessionKey = session.sessionKey

      console.log('Session key: ', this.sessionKey)
      setTimeout(this.getAttest.bind(this), 4000)

      this.props.onShowQR()

      if (this.isMobile) {
        this.setState({status: 'scanned'})
        // window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
        if (linkTo === 'web') {
          this.identityApp = window.open(`${baseUrlFrontend}/attest/${this.sessionKey}`, '_blank')
        }
      } else {
        this.setState({status: 'new'})
      }
    })
      .catch(error => {
        // clearInterval(this.interval1)
        console.log('error: ', error)
        this.props.onError(error)
      })

      // let question = session.question.subQuestions.map(subQuestion => {
      //   subQuestion.label = questionData.properties[subQuestion.property].label
      //   subQuestion.operatorString = questionData.operators[subQuestion.operator]
      //   return subQuestion
      // })

      // console.log('questionData: ', questionData)
      // console.log('question: ', JSON.stringify(question))
  }

  getAttest = async function () {
    pollTries += 1
    if (pollTries > maxAmountofPolls) {
      this.setState({
        status: null
      })
      pollTries = 0
      return
    }
    let attestResponse
    let url = `${baseUrl}/api/attest`
    let body = {
      sessionKey: this.sessionKey
    }
    if (this.props.secret) {
      body.secret = this.props.secret
    }

    try {
      let response = await axios.post(url, body)
      attestResponse = response.data
    } catch (error) {
      console.log(error.response)
      this.props.onError(error)
    }

    if (this.state.status === 'scanned' && attestResponse.status === 'new') {
      return setTimeout(this.getAttest.bind(this), 2000)
    } // for mobile

    let status = attestResponse.status

    if (status === 'new') {
      setTimeout(this.getAttest.bind(this), 2000)
    }

    if (status === 'scanned') {
      setTimeout(this.getAttest.bind(this), 2000)
      if (this.state.status !== 'scanned') {
        this.props.onScan()
      }
    }

    if (status === 'rejected') {
      this.props.onReject()
      if (this.identityApp) this.identityApp.close()
    }

    if (status === 'approved') {
      if (this.props.secret) {
        this.props.onAgree(null, attestResponse.attest)
      } else {
        this.props.onAgree(this.sessionKey)
      }
      if (this.identityApp) this.identityApp.close()
    }

    this.setState({
      status
    })
  }

  render() {
    return (
      <div className={this.props.className} style={this.props.style}>
        {
          (!this.state.status) && (
            <div style={{textAlign: 'center'}}>
              <a onClick={this.showQRHandler}>
                {
                  this.isMobile ? 'Log in met KvK ID app' : 'Toon QR code'
                }
              </a>
              {
                this.isMobile && (
                  <div>
                    <br />
                    <a onClick={() => this.showQRHandler('web')}>Log in met KvK ID app (in browser)</a>
                    {/*<a onClick={this.debugOnclick}>debug mobile link</a>*/}
                  </div>
                )
              }
            </div>
          )
        }
        {
          (this.state.status === 'new') && (
            <div>
              <div style={{padding: '0 12px', textAlign: 'center'}}>
                Scan de QR code hieronder met de KvK Identity app.
              </div>
              <div style={{padding: '12px 0', textAlign: 'center'}}>
                <QRCode value={this.sessionKey} />
              </div>
              <div style={{padding: '0 12px', color: 'gray', fontSize: '0.9em', textAlign: 'center'}}>
                Heeft u de KvK Identity app nog niet geinstalleerd, ga dan naar https://identity.mayersoftwaredevelopment.nl op uw SmartPhone.
              </div>
            </div>
          )
        }
        {
          (this.state.status === 'scanned') && (
            <div style={{padding: '0 12px', color: 'gray', fontSize: '0.9em', textAlign: 'center'}}>We wachten op uw goedkeuring...</div>
          )
        }
      </div>
    )
  }
}

IdentityQR.propTypes = {
  questionId: PropTypes.string.isRequired,
  onShowQR: PropTypes.func,
  onScan: PropTypes.func,
  onAgree: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onError: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string
}

export default IdentityQR