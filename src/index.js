const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-9",
    url: "https://google.com",
    description: "Yeah the url itself"
  },
  {
    id: "link-0",
    url: "https://twitter.com/zazk",
    description: "Another URL from zazk"
  }
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => "This a tryout shit",
    feed: () => links,
    link: (_, args) => {
      const [selected] = links.filter(obj => args.id == obj.id);
      return selected;
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      };
      links.push(link);
      return link;
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
  resolvers
});
server.start(() =>
  console.log("This thing really runs! Is running on http://localhost:4000")
);
