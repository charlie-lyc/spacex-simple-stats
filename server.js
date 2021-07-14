const express = require('express')
const app = express()
/******************************************************/

// app.get('/', (req, res) => res.send('Hello world!'))

///////////////////////////////////////////////////////

/* CORS(Cross-Origin Resource Sharing)  setup for "@apollo-client" */ 
// 반드시 GraphQL 서버를 작성하여 연결하기 전에 앞서 설정되어야 데이터 인출이 가능!!!
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:3000', // Client link
    credentials: true
}))

///////////////////////////////////////////////////////

/* GraphQL-Express HTTP and Schema setup */
const { graphqlHTTP } = require('express-graphql')
const GraphQLSchema = require('./schema')

app.use('/graphql', graphqlHTTP({ 
    schema: GraphQLSchema, 
    graphiql: true
}))

///////////////////////////////////////////////////////

/* Setup for Deployment and Hosting static folder */
const path = require('path')
app.use(express.static('public'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

/******************************************************/
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))