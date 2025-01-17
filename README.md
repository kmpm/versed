# Versed
File conversion can be a pain. Especially when you're trying to automate it. That's why I created Versed, a microservice specifically for that purpose.

Versed exposes a web API for converting files, and also comes with a simple web frontend for manual file conversion. 

![Versed frontend](https://user-images.githubusercontent.com/5178445/29902290-c7bd44d4-8dc2-11e7-9aca-6ff17b264971.png)

It's currently powered by LibreOffice and FFmpeg, which means it supports the same file formats that those tools support, but you can easily add more tools to its arsenal.

Read the [blog post](http://aka.sb/Versed) to learn more!

## Getting started

Run the following commands to get up and running.

```
git clone https://github.com/sgbj/versed.git
cd versed
docker build -t versed .
docker run -d -p 3000:3000 versed
```

If you want a smaller container then please uncomment 
```
# test/fixtures/
```
in .dockeringore

Open a browser window and go to http://localhost:3000/.

## OpenAPI

You can access the OpenAPI (aka Swagger) 2.0 spec by accessing http://localhost:3000/openapi-spec.yaml or by opening the file in the public/ folder of the repo.
You can generate a client for this microservice by using https://editor.swagger.io/.
An example Python client (and an example usage script) is included in the clients/ folder of the repo.

## Calling it from Node

One way to consume the convert endpoint in Node.js code is by using the [request package](https://www.npmjs.com/package/request). 

```js
const fs = require('fs');
const request = require('request');

let req = request.post('http://localhost:3000/convert');
let form = req.form();
form.append('file', fs.createReadStream('video.mp4'));
form.append('format', 'gif');
req.pipe(fs.createWriteStream('image.gif'));
```

## Calling it using curl

```shell
# this will convert `testdata/file-sample_100kB.docx` to pdf and save it using the filename given in the resonse header.
curl -F format=pdf -F "file=@testdata/file-sample_100kB.docx" -OJ  http://localhost:3000/convert

```
