module.exports = {
    production:{
        connectionString: process.env.POSTGRES_CONNECTION_STRING +"?ssl=true",
        port: process.env.PORT
    },
    dev: {
        connectionString: 'postgres://postgres:postgrespw@localhost:55000/capstone_data',
        //'postgresql://postgres:docker@127.0.0.1:5432/capstone_data' - everyone but Brandon
        port: 8000 //PORT GOES HERE
    }
}
