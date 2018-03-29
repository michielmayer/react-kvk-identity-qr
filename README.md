react-kvk-identity-qr
=======================
[![npm version](https://badge.fury.io/js/react-kvk-identity-qr.svg)](https://badge.fury.io/js/react-innovatielab-identity-qr)

## Introduction
A [React](https://facebook.github.io/react/) component for generating a QR code that represents a question about someones KvK identity. Questions are registered on the [innovatielab.nl domain](https://identity.mayersoftwaredevelopment.nl). For each question an ID is generated which should be included on the questioners page. Based on this ID a QR code is generated. The user will scan this QR code with his [Innovatielab identity App](https://identity.mayersoftwaredevelopment.nl) (follow this link on your Smart Phone). If the user agrees to the information exchange, the questioner will receive (part of) the users identity.   

Creating a question happens after authentication, so the questioners identity is assured. Scanning a QR code by the user also happens after authentication, which assures the users identity. So both parties know for sure who they are dealing with.

## Demo
[sligro.michielmayer.nl/identity](http://sligro.michielmayer.nl/identity)

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
      attests: []
    }
  }

  onShowQR = (question) => {
    console.log('question: ', question)
    /*
      will output eg:

      [{
        '_id': '59b913a68fd3843665f61415',
        'property': 'postalCode',
        'label': 'Postcode',
        'operator': 'eq',
        'operatorString': 'is gelijk aan'
        'compareValue': '3948',
        'dimension': '',
      }]
    */
  }

  onAgree = (attests) => {
    this.setState({attests})
  }

  onReject = (message) => {
    console.log('rejection message: ', message)
  }
  
  onError = (error) => {
    console.log('error: ', error)
  }

  render() {
    return (
      <div>
        <KvKIdentityQR questionId="59a535ea6af205300238b8f9" qrId="1234" onShowQR={this.onShowQR} onAgree={this.onAgree} onReject={this.onReject} onError ={this.onError} />
        {
          this.state.attests.map(attest => {
            return (
              <div key={attest.property}>
                <div>{`${attest.label} ${attest.operatorString} ${attest.compareValue} ${attest.dimension}?`}</div>
                <div>{attest.value}</div>
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

**qrId**

Type: `string`, Required

Id to identify this specific QR code instance. Required to be able to distinguish multiple QR codes using the same questionId.

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
