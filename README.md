react-kvk-identity-qr
=======================
[![npm version](https://badge.fury.io/js/react-kvk-identity-qr.svg)](https://badge.fury.io/js/react-kvk-identity-qr)

## Introduction

For general information about KvK Identity, please visit [the KvK Identity homepage](https://identity.mayersoftwaredevelopment.nl/home).
For technical information about KvK Identity, and how to use it on the Dutch Blockchain Hackathon, please visit [the KvK Identity Developers Guide](https://identity.mayersoftwaredevelopment.nl/manual).

## Demo
[sligro.michielmayer.nl/identity](http://sligro.michielmayer.nl/identity)
[sligro.michielmayer.nl/identity/example](http://sligro.michielmayer.nl/identity/example)

## Known Issues
- Due to browser implementations the camera can only be accessed over https or localhost.
- Only compatible with newest macOS/iOS Safari version.

## Install
`npm install --save react-kvk-identity-qr`

## Example

```js
import React from 'react'
import KvKIdentityQR from 'react-kvk-identity-qr'

class IdentityView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attest: []
    }
  }

  onAgree = (sessionKey, data) => {
    this.setState({attest: data.attest})
  }

  onReject = (message) => {
    console.log('rejection message: ', message)
  }

  render() {
    return (
      <div>
        <KvKIdentityQR questionId="5a9fba89c5fde905a88843e0" secret="6f57be0d538757bb7a3343a9aa4e62023ec4aa86" onAgree={this.onAgree} onReject={this.onReject} />
        {
          this.state.attest.map(subAttest => {
            return (
              <div key={subAttest.property}>
                <div>{`${subAttest.label} ${subAttest.operatorString} ${subAttest.compareValueSelect || subAttest.compareValue} ${subAttest.dimension || ''}?`}</div>
                <td>{(typeof subAttest.value === 'boolean') ? ((subAttest.value === true) ? 'Ja' : 'Nee') : subAttest.value}</td>
              </div>
            )
          })
        }
      </div>
    )
  }
}
```

## Props

**questionId**

Type: `string`, Required

The id that refers to the question, created on the kvk.nl domain.

**onAgree**

Type: `function`, Required, Argument: `attests`

Agree event handler. Called after user agreed to information exchange, and the information is received. `attests` keeps an array of the attribute values corresponding the original question.

**onReject**

Type: `function`, Required, Argument: `message`

Function to call when user rejected the information exchange.

**onError**

Type: `function`, Required, Argument: `error`

Function to call when something went wrong with the information request.

**style**

Type: `object`, Optional

Styling of the container element.

**className**

Type: `string`, Optional

ClassName for the container element.

## Dev

### Install dependencies
`npm install`

### Build
`npm run build`

## Tested platforms
- Safari 11 and Chrome 56 and Firefox 53 on macOs 10.12
- Chrome 55 and Firefox 50 on Android 6.0.1
- Safari 11 on IOS 10

## LICENSE Copyright (c) 2017, Michiel Mayer
