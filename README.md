react-kvk-identity-qr
=======================
[![npm version](https://badge.fury.io/js/react-kvk-identity-qr.svg)](https://badge.fury.io/js/react-kvk-identity-qr)

## Introduction

KvK Identity makes sure that you can identify yourself as a legal authorized representive of your company by reference of your Chamber of Commerce unique Company ID. Here, we explain how to add KvK Identity widget to your site.
For more information about KvK Identity, please visit [the KvK Identity homepage](https://identity.mayersoftwaredevelopment.nl/home).

To see a running example of this widget, please visit [sligro.michielmayer.nl/identity](http://sligro.michielmayer.nl/identity)

To start using KvK identity QR code, you need to [login and create a question](https://identity.mayersoftwaredevelopment.nl/questions).

_For the Dutch Blockchain Hackathon, you can log in eg. with\*: KvK number: **33235264**, pw: **kvk**_

You will receive a question ID and a secret key. The Question ID is used to invoke the QR code on your site. The secret key authorizes communication between your application backend and the KvK server to exchange Identity information. The secret key needs to be kept safe for security purposes.

The widget will render a QR code that represent the question. Visitors of your site will scan the QR code with their KvK Identity app. Within the app they will approve or reject the exchange of information.

The app is a 'progressive web app' running at [https://identity.mayersoftwaredevelopment.nl](https://identity.mayersoftwaredevelopment.nl). Open this url in a mobile browser. (You could save it to desktop for better app experience)

_For the Dutch Blockchain Hackathon, you can log in eg. with\*: KvK number: **96872231**, pw: **kvk**_


_\* You can log in with any KvK number known by the [KvK Hackathon API](https://hackathonkvk.azurewebsites.net/swagger/ui/index). Password is always **kvk**._

## Install
`npm install --save react-kvk-identity-qr`

## Implement KvK Identity widget for demo purposes

The example below shows the minimal amount of code to implement the widget. You have to put the question ID as a property on the `KvKIdentityQR` element. 

You should set onAgree and onReject handler functions on the element, that will be fired when the user agrees to or rejects the information exchange.

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

  onReject = () => {
    console.log('rejected')
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
                <div>{(typeof subAttest.value === 'boolean') ? ((subAttest.value === true) ? 'Ja' : 'Nee') : subAttest.value}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default IdentityView
```

**Note**: In this example we put the secret property on the `KvKIdentityQR` element. This is not secure! This is for demo purposes, to quickly demonstrate the possibilities, without having to implement a server endpoint. In production you want to fetch the attest through your server, on which the secret is securely stored. (see next chapter)

The onAgree handler will be called with two parameters; a session key and a data object. In the data object, you will find the following information:
  - **attest**: The attest in JSON format.
  - **signedAttest**: A JSON Web Token containing the same attest and a timestamp, signed by the KvK.
  - **cert**: The KvK certificate that can be used to verify the signed attest.

## Implement KvK Identity widget in production

If you want to implement the widget securely, you should not put the secret in your frontend code, as you did in the example above. You should get the attest through your server, on which the secret is securely stored.

The setup is very similar. You should leave out the secret property of the `KvKIdentityQR` element. If you do that, the onAgree handler will be called with only a session key. This session key should be used in a POST request to your backend endpoint to get the attest.

The example below shows the minimal amount of code to implement the widget on the client side.

```js
import React from 'react'
import KvKIdentityQR from 'react-kvk-identity-qr'
import axios from 'axios'

class IdentityView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      attest: []
    }
  }

  onAgree = (sessionKey) => {
    axios.post('url_of_your_server_endpoint', {sessionKey})
      .then(response => {
        this.setState({attest: response.data.attest})
      })
      .catch(error => {
        console.log('Attest fetch error: ', error)
      })
  }

  onReject = () => {
    console.log('rejected')
  }

  render() {
    return (
      <div>
        <KvKIdentityQR questionId="5a9fba89c5fde905a88843e0" onAgree={this.onAgree} onReject={this.onReject} />
        {
          this.state.attest.map(subAttest => {
            return (
              <div key={subAttest.property}>
                <div>{`${subAttest.label} ${subAttest.operatorString} ${subAttest.compareValueSelect || subAttest.compareValue} ${subAttest.dimension || ''}?`}</div>
                <div>{(typeof subAttest.value === 'boolean') ? ((subAttest.value === true) ? 'Ja' : 'Nee') : subAttest.value}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default IdentityView
```
On your backend, you should setup an endpoint that proxies the request to get the attest, with the secret added as a parameter in the body.

It should send a POST request to https://identity.mayersoftwaredevelopment.nl/api/attest with the following two parameters:
  - **sessionKey**:	Get this from body of the original request
  - **secret**:	Your secret key

You will find the attest in the body of the response. Find below an example of this endpoint in NodeJS:

```js
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const secret = 'your_secret'; // Should be stored somewhere on your server probably

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/attest', function (req, res) {
    let body = req.body;
    body.secret = secret;

    request({
            url: 'https://identity.mayersoftwaredevelopment.nl/api/attest',
            method: 'POST',
            json: body
        }, function (error, response, data) {
            if (!error && response.statusCode === 200) {
                res.send(data)
            }
        }
    );
});

app.listen(5001, () => console.log('Example app listening on port 5001!'));
```

## Props

**questionId**

Type: `string`, Required

The ID that identifies the question.

**secret**

Type: `string`, Optional

Your KvK secret key. For demo purposes, to avoid having to set up a backend endpoint.

**onAgree**

Type: `function`, Required, Argument: `sessionKey, data`

Fired when the user agrees to information exchange in his app. This function will be called with two parameters; sessionKey and data. If you didn't put a `secret` property on the `KvKIdentityQR` element, data will be null, and the sessionKey should be used to get the attest.

**onReject**

Type: `function`, Required

Fired when the user rejects information exchange in his app.

**onError**

Type: `function`, Optional, Argument: `error`

Fired when an error occurs.

**onShowQR**

Type: `function`, Optional

Fired when the user clicks the button that will show the QR code.

**onScan**

Type: `function`, Optional

Fired when the user scans the QR code.

**mode**

Type: `string`, Optional

Possible values: "inline" or "overlay". Default "overlay". The way the QR code appears on your page.

**style**

Type: `object`, Optional

Styling of the container element.

**className**

Type: `string`, Optional

ClassName for the container element.

## Known Issues
- Due to browser implementations the camera can only be accessed over https or localhost.
- Only compatible with newest macOS/iOS Safari version.

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
