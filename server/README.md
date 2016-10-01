# Eslintfight

**Database**

Install postgresql database and run the following commands in postgresql shell

```
CREATE USER eslintfight WITH PASSWORD 'super_secret_database_password';
CREATE DATABASE eslintfight;
GRANT ALL PRIVILEGES ON DATABASE "eslintfight" to eslintfight;
```


**Configuration**

Create `.env` file to `server` directory. Paste the following there and fill the variable values

`.env`

```
export DATABASE_URL=postgres://eslintfight:super_secret_database_password@localhost/eslintfight
```

**Dependencies**

`npm install`

**Run in development mode**
```
source .env
npm run migrate
npm run watch
```
