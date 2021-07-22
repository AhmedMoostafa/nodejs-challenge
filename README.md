# nodejs-challenge


## technologies and tools

- Node.js
- Express
- PostgreSQL
- lodash
- bluebird

to run 
```sh
npm start
```
to store new data into database make post request on this url

```sh
https://bikes-challenge.herokuapp.com/api/v1/save-data
```

API Examples
```sh
https://bikes-challenge.herokuapp.com/api/v1/stations/3106?from=2021-07-20T20:46:47&to=2021-07-22T20:46:47&frequency=hourly
```

```sh
https://bikes-challenge.herokuapp.com/api/v1/stations/3106?from=2021-07-20T20:46:47&to=2021-07-22T20:46:47&frequency=daily
```

```sh
https://bikes-challenge.herokuapp.com/api/v1/stations?at=2021-07-21T20:46:47
```

```sh
https://bikes-challenge.herokuapp.com/api/v1/stations/3106?at=2021-07-21T20:00:00
```

