# MozeApp - The App

## Installation instructions

- Ajouter le .ENV
- Verfiier que **_TOUT_** soit en LF (et pas CRLF)
  - Si non faire :
    - `git config core.autocrlf false`
    - `git config core.eol LF`
    - `git rm --cached -r .` **NE PAS OUBLIER LE POINT**
    - `git reset --hard`
- `composer update`
- `composer install`
- `docker-compose build --no-cache --pull`
- `docker-compose up -d`
