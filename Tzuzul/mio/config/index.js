require("dotenv").config()

const config = {
    mode: process.env.MODE,
    port: process.env.PORT,
    db_password: process.env.DB_PASSWORD,
    db_username: process.env.DB_USERNAME,
    db_host: process.env.DD_HOST,
    db_name: process.env.DB_NAME,
    jwt_secret:process.env.JWT_SECRET,
    oauth_client_id: process.env.OAUTH_CLIENT_ID,
    oauth_client_secret: process.env.OAUTH_CLIENT_SECRET,
    oauth_callback_url:process.env.OAUTH_CALLBACK_URL
}

module.exports = config