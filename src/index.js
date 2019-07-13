const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
  Query: {
    info: () => "This a tryout shit",
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
    link: (_, args) => {
      const [selected] = links.filter(obj => args.id == obj.id);
      return selected;
    }
  },
  Mutation: {
    post: (_, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    },
    updateLink: (parent, args) => {
      const [link] = links.filter(obj => args.id == obj.id);
      link.description = args.description;
      link.url = args.url;
      return link;
    },
    deleteLink: (parent, args) => {
      const [link] = links.filter(obj => args.id == obj.id);
      links = links.filter(obj => args.id !== obj.id);
      return link;
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: { prisma }
});
server.start(() =>
  console.log("This thing really runs! Is running on http://localhost:4000")
);
