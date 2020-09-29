# Fullstack-Users

## Description 

A user is defined by the following attributes: email, password, name (first and last).

Build a web application in charge of

- Creating new users by entering their email address, password and name.
- Displaying the list of created users.
- Searching for a user by email or name.

This application will necessarily have a front-end and a back-end part.

On the front-end the app will display the user interface allowing the listed operations above.

On the back-end , build a server hosted API in charge of managing users. It should provide to
the front-end all the necessary endpoints to create new users, retrieve the list of created ones
and search for a given user with name and/or email address.

On a user creation request , you should check if the request is made from France. Only if it is,
you should allow the user creation, otherwise the request must be rejected. You can use the IP
address and https://ipapi.co/ to geolocate it.

You are allowed to implement the created users persistence as you want server side. You
may use a database or any other mean you think fits with the current exercise. We will look
carefully at your choice.

You are free to use the technologies / languages you are comfortable with.

We will have a special look at :

- Code quality
- Application design
- Tests
- Documentation
- Logs

Bonus point :

- On each meaningful operation, an event is posted to a service bus (Kafka, RabbitMQ…).
- The app implements metrics server side, counting the # of requests, successful or not,
time metrics...

As a deliverable, we expect a GitHub repository (or any other git based repo) with the source
code. You will provide us with documentation explaining how to install, launch and test the
application on our machines (we use MacBook Pros, so please think linux/bash and not
windows/cmd). We will appreciate having the history of commits and merges.

Documentation

ipapi.co
IP Location
IP address location API and geolocation service. Find city, region, country, continent, latitude,
longitude, timezone, UTC offset, currency, language, asn, organization, country calling code,
european union (EU) member from an IP address. Secure, fast, free and accurate IP lookup
supports JSON, CSV, XML and YAML.

## Installation

* Clone this repository

```bash
$ lerna bootstrap
```
* Server instructions : See [README](packages\server\README.md)

## Highlights

This repo uses [lerna](https://github.com/lerna/lerna) monorepo to easily handle multiple projects.

This repo is hosted on [Gitlab](https://gitlab.com/guillaume.roy/fullstack-users) and uses CI/CD system.
You can find details in [.gitlab-ci.yml](.gitlab-ci.yml). Each commit triggers a pipeline that will run unit tests and report code coverage. You can find details [here](https://gitlab.com/guillaume.roy/fullstack-users/-/pipelines).

## Stay in touch

- Author - [Guillaume Roy](https://github.com/guillaume-roy)