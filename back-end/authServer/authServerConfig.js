module.exports = {
    production:{
        connectionString: process.env.POSTGRES_CONNECTION_STRING +"?ssl=true",
        port: process.env.PORT
    },
    dev: {
        connectionString: 'postgres://postgres:postgrespw@localhost:49153/capstone_data',
        port: 7000 //PORT GOES HERE
    }
}