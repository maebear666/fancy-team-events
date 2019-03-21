import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString,  GraphQLSchema } from 'graphql';
import { Client } from 'pg';

const getUserQuery = "select id, email, name from users where id=$1";
const addUserQuery = "insert into users (name, email) values ($1, $2) RETURNING id, name, email;";

const client = new Client();
client.connect();

// Define the User type
const userType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        email: { type: GraphQLString }
    }
});

// @ts-ignore
const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            // `args` describes the arguments that the `user` query accepts
            args: {
                id: { type: new GraphQLNonNull(GraphQLInt) }
            },
            // @ts-ignore
            resolve: function (_, {id}) {
                console.log(id);
                // @ts-ignore
                return client.query(getUserQuery, [id]).then(res => {
                    if (res.rows.length > 0) {
                        return res.rows[0];
                    }
                });
            }
        }
    }
});

// @ts-ignore
const mutatorType = new GraphQLObjectType( {
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString }
            },
            // @ts-ignore
            resolve: function (_, {name, email}) {
                console.log(name);
                // @ts-ignore
                return client.query(addUserQuery, [name, email]).then(res => {
                    if (res.rows.length > 0) {
                        return res.rows[0];
                    }
                })
            }
        }
    }
});

export const schema2 = new GraphQLSchema({query: queryType, mutation: mutatorType});
