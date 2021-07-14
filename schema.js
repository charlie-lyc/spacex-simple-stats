const {
    GraphQLInt,
    GraphQLString,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql')
const axios = require('axios')
/******************************************************/

const CoreType = new GraphQLObjectType({
    name: 'Core',
    fields: () => ({
        core: { type: GraphQLString },
        flight: { type: GraphQLInt },
        landing_type: { type: GraphQLString },
        landing_success: { type: GraphQLBoolean }
    })
})

const LaunchType = new GraphQLObjectType({
    name: 'Launch',
    fields: () => ({
        id: { type: GraphQLString },
        flight_number: { type: GraphQLInt },
        name: { type: GraphQLString },
        date_local: { type: GraphQLString },
        success: { type: GraphQLBoolean },
        cores: { type: new GraphQLList(CoreType) },
        rocket: { type: GraphQLString }
    })
})

const RocketType = new GraphQLObjectType({
    name: 'Rocket',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        active: { type: GraphQLBoolean },
        cost_per_launch: { type: GraphQLInt }
    })
})

const QueryRootType = new GraphQLObjectType({
    name: 'QueryRoot',
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve: () => axios.get('https://api.spacexdata.com/v4/launches').then(res => res.data)
        },
        launch: {
            type: LaunchType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => axios.get(`https://api.spacexdata.com/v4/launches/${args.id}`).then(res => res.data)
        },
        rockets: {
            type: new GraphQLList(RocketType),
            resolve: () => axios.get('https://api.spacexdata.com/v4/rockets').then(res => res.data)
        },
        rocket: {
            type: RocketType,
            args: {
                id: { type: GraphQLString }
            },
            resolve: (parent, args) => axios.get(`https://api.spacexdata.com/v4/rockets/${args.id}`).then(res => res.data)
        }
    }
})

// const MutationRootType = new GraphQLObjectType({
//     name: 'MutationRoot',
//     fields: {
//     } 
// })

/******************************************************/
module.exports = new GraphQLSchema({
    query: QueryRootType,
    // mutation: MutationRootType
})