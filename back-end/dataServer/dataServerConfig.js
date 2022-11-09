module.exports = {
    production:{
        connectionString: process.env.POSTGRES_CONNECTION_STRING +"?ssl=true",
        port: process.env.PORT
    },
    dev: {
        connectionString: 'POSTGRES PATH GOES HERE',
        port: 8000 //PORT GOES HERE
    }
}
