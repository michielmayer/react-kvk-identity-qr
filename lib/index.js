'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _qrcode = require('qrcode.react');

var _qrcode2 = _interopRequireDefault(_qrcode);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var baseUrl = 'https://identity.mayersoftwaredevelopment.nl';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:5010';
}
var baseUrlFrontend = 'https://identity.mayersoftwaredevelopment.nl';
if (process.env.NODE_ENV === 'development') {
  baseUrlFrontend = 'http://localhost:3010';
}
var baseUrlApp = 'identity://kvk.nl';
var pollTries = 0;
var maxAmountofPolls = 150; // 360

function mobileCheck() {
  var check = false;
  (function (a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

var IdentityQR = function (_React$Component) {
  (0, _inherits3.default)(IdentityQR, _React$Component);

  function IdentityQR(props) {
    (0, _classCallCheck3.default)(this, IdentityQR);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IdentityQR.__proto__ || (0, _getPrototypeOf2.default)(IdentityQR)).call(this, props));

    _this.showQRHandler = function (linkTo) {
      // window.open(`${baseUrlApp}/attest/eb98b290-2b6e-11e8-9b0e-a332084f452c`)

      var sessionKey = void 0;
      if (_this.isMobile && linkTo === 'app') {
        sessionKey = _this.sessionKey = (0, _v2.default)();
        window.open(baseUrlApp + '/attest/' + _this.sessionKey);
      }

      _axios2.default.post(baseUrl + '/api/session', {
        questionId: _this.props.questionId,
        sessionKey: sessionKey
      }).then(function (sessionResponse) {
        var session = sessionResponse.data;
        _this.sessionKey = session.sessionKey;

        console.log('Session key: ', _this.sessionKey);
        _this.timeout = setTimeout(_this.getAttest.bind(_this), 4000);

        if (_this.props.onShowQR) _this.props.onShowQR();

        if (_this.isMobile) {
          _this.setState({ status: 'scanned' });
          // window.open(document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
          if (linkTo !== 'app') {
            _this.identityApp = window.open(baseUrlFrontend + '/attest/' + _this.sessionKey, '_blank');
          }
        } else {
          _this.setState({ status: 'new' });
        }
      }).catch(function (error) {
        // clearInterval(this.interval1)
        console.log('error: ', error);
        if (_this.props.onError) _this.props.onError(error);
      });

      // let question = session.question.subQuestions.map(subQuestion => {
      //   subQuestion.label = questionData.properties[subQuestion.property].label
      //   subQuestion.operatorString = questionData.operators[subQuestion.operator]
      //   return subQuestion
      // })

      // console.log('questionData: ', questionData)
      // console.log('question: ', JSON.stringify(question))
    };

    _this.getAttest = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var attestResponse, url, body, response, status;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              pollTries += 1;

              if (!(pollTries > maxAmountofPolls)) {
                _context.next = 5;
                break;
              }

              this.setState({
                status: null
              });
              pollTries = 0;
              return _context.abrupt('return');

            case 5:
              attestResponse = void 0;
              url = baseUrl + '/api/attest';
              body = {
                sessionKey: this.sessionKey
              };

              if (this.props.secret) {
                body.secret = this.props.secret;
              }

              _context.prev = 9;
              _context.next = 12;
              return _axios2.default.post(url, body);

            case 12:
              response = _context.sent;

              attestResponse = response.data;
              _context.next = 20;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](9);

              console.log(_context.t0.response);
              if (this.props.onError) this.props.onError(_context.t0);

            case 20:
              if (!(this.state.status === 'scanned' && attestResponse.status === 'new')) {
                _context.next = 22;
                break;
              }

              return _context.abrupt('return', this.timeout = setTimeout(this.getAttest.bind(this), 2000));

            case 22:
              // for mobile

              status = attestResponse.status;


              if (status === 'new') {
                this.timeout = setTimeout(this.getAttest.bind(this), 2000);
              }

              if (status === 'scanned') {
                this.timeout = setTimeout(this.getAttest.bind(this), 2000);
                if (this.state.status !== 'scanned') {
                  if (this.props.onScan) this.props.onScan();
                }
              }

              if (status === 'rejected') {
                this.props.onReject();
                if (this.identityApp) this.identityApp.close();
              }

              if (status === 'approved') {
                if (this.props.secret) {
                  this.props.onAgree(null, attestResponse.attest);
                } else {
                  this.props.onAgree(this.sessionKey);
                }
                if (this.identityApp) this.identityApp.close();
              }

              this.setState({
                status: status
              });

            case 28:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[9, 16]]);
    }));

    _this.qrContainerClicked = function () {
      if (_this.props.mode !== 'inline') {
        _this.setState({
          status: null
        });
        clearTimeout(_this.timeout);
      }
    };

    _this.state = {
      question: []
    };
    _this.isMobile = mobileCheck();
    return _this;
  }

  (0, _createClass3.default)(IdentityQR, [{
    key: 'render',
    value: function render() {
      var label = this.props.label || 'Log in met KvK Identity';
      var styles = {};

      if (this.props.mode === 'inline') {
        styles = {
          qrContainer: {
            color: '#000'
          },
          qrHeader: {
            padding: '12px',
            textAlign: 'center'
          },
          qrFooter: {
            padding: '12px',
            fontSize: '14px',
            textAlign: 'center'
          }
        };
      } else {
        styles = {
          qrContainer: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,.7)',
            display: 'flex',
            alignItems: 'center',
            zIndex: '1001',
            justifyContent: 'center',
            color: '#fff',
            flexDirection: 'column'
          },
          qrHeader: {
            padding: '24px',
            textAlign: 'center',
            fontSize: '22px'
          },
          qrFooter: {
            padding: '12px',
            fontSize: '14px',
            textAlign: 'center'
          }
        };
      }

      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: this.props.style },
        !this.state.status && _react2.default.createElement(
          'div',
          { style: { textAlign: 'center' } },
          _react2.default.createElement(
            'div',
            { style: { textAlign: 'center', padding: '12px' } },
            _react2.default.createElement(
              'button',
              { onClick: this.showQRHandler,
                style: { padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  cursor: 'pointer' } },
              _react2.default.createElement('img', { style: { width: '24px', paddingRight: '6px', verticalAlign: 'middle' },
                src: 'https://identity.mayersoftwaredevelopment.nl/images/kvk-logo-small.png',
                alt: 'kvk' }),
              _react2.default.createElement(
                'span',
                null,
                label
              )
            )
          )
        ),
        this.state.status === 'new' && _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { style: styles.qrContainer, onClick: this.qrContainerClicked },
            _react2.default.createElement(
              'div',
              { style: styles.qrHeader },
              'Scan met de KvK Identity app.'
            ),
            _react2.default.createElement(
              'div',
              { style: { textAlign: 'center' } },
              _react2.default.createElement(_qrcode2.default, { value: this.sessionKey })
            ),
            !this.isMobile && _react2.default.createElement(
              'div',
              { style: styles.qrFooter },
              'Download de app op https://identity.mayersoftwaredevelopment.nl'
            )
          )
        ),
        this.state.status === 'scanned' && _react2.default.createElement(
          'div',
          { style: { padding: '0 12px', color: 'gray', fontSize: '0.9em', textAlign: 'center' } },
          'We wachten op uw goedkeuring...'
        )
      );
    }
  }]);
  return IdentityQR;
}(_react2.default.Component);

IdentityQR.propTypes = {
  questionId: _propTypes2.default.string.isRequired,
  onShowQR: _propTypes2.default.func,
  onScan: _propTypes2.default.func,
  onAgree: _propTypes2.default.func.isRequired,
  onReject: _propTypes2.default.func.isRequired,
  onError: _propTypes2.default.func,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  label: _propTypes2.default.string
};

exports.default = IdentityQR;
