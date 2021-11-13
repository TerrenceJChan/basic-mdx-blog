const _ = require("lodash")
const slugify = require("slugify")

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            frontmatter {
              slug
              tags
            }
            id
          }
        }
      }
    }
  `)

  // Create paginated pages for posts
  const postPerPage = 3
  const numPages = Math.ceil(data.allMdx.edges.length / postPerPage)

  Array.from({ length: numPages }).forEach((_, i) => {
    actions.createPage({
      path: i == 0 ? "/" : `/${i + 1}`,
      component: require.resolve("./src/templates/allPosts.js"),
      context: {
        limit: postPerPage,
        skip: i * postPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Create single blog posts
  data.allMdx.edges.forEach(edge => {
    const slug = edge.node.frontmatter.slug
    const id = edge.node.id
    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/singlePost.js`),
      context: { id },
    })
  })

  let tags = []
  _.forEach(data.allMdx.edges, edge => {
    // tags = tags.concat(edge.node.frontmatter.tags)
    if (_.get(edge, "node.frontmatter.tags")) {
      tags = tags.concat(edge.node.frontmatter.tags)
    }
  })

  let tagPostCounts = {}
  tags.forEach(tag => {
    tagPostCounts[tag] = (tagPostCounts[tag] || 0) + 1
  })

  // Get all tags
  tags = _.uniq(tags)
  // Create tag posts pages
  tags.forEach(tag => {
    Array.from({
      length: Math.ceil(tagPostCounts[`${tag}`] / postPerPage),
    }).forEach((_, i) => {
      actions.createPage({
        path: `${slugify(tag)}/${i + 1}`,
        component: require.resolve("./src/templates/tags.js"),
        context: {
          limit: postPerPage,
          skip: i * postPerPage,
          currentPage: i + 1,
          slug: slugify(tag),
          numPages,
          tag,
        },
      })
    })
  })
}
