# short-url

## Description
A short url example built with Node.js, Express, MySQL

## Build
- Node.js 14.x
- Express 4.x
- MySQL 8.x

## Features
- Convert original url to a shorten url
- Create shorten url with custom alias
- Create shorten url with custom expiration
- Get original url by a shorten url
- Implement database table partitioning to store more urls

## API

### Create shorten url

**Endpoint**

POST https://localhost/keys

**Request**

```JSON
{
  "original_url": "https://www.google.com", // required
  "custom_alias": "DJ-A32+3M2", // optional, max length = 20
  "expire_date": "2030-01-01T00:00:00Z" // optional, ISO date
}
```

**Response**

Status Code 201
```JSON
{
  "url_key": "wMzfR6Osci7714cA3aaq"
}
```
Status Code 400
```JSON
{
  "msg": "original_url is required"
}
```
```JSON
{
  "msg": "Invalid custom_alias"
}
```

### Get original url

**Endpoint**

GET https://localhost/{key}

**Response**

Status Code 200
```JSON
{
  "url": "https://www.google.com"
}
```
Status Code 404
```JSON
{
  "msg": "Url key does not exist or is expired"
}
```