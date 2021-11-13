import React from "react"
import { graphql } from "gatsby"
import {
  Container,
  Content,
  ContentCard,
  FeatureImage,
  Pagination,
  Seo,
} from "../components"
import { H1, P } from "../elements"

const tags = ({ pageContext, data }) => {
  const { tag, slug, currentPage, numPages } = pageContext
  const { totalCount } = data.allMdx
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = `/${slug}/${currentPage - 1}`
  const nextPage = `/${slug}/${currentPage + 1}`

  const posts = data.allMdx.edges

  return (
    <Container>
      <Seo />
      <FeatureImage />
      <Content>
        <H1 textAlign="center" margin="0 0 1rem 0">
          Sample Title
        </H1>
        <P color="dark2" textAlign="center">
          There are {totalCount} posts tagged with "{tag}"
        </P>
        {posts.map(post => (
          <ContentCard
            key={post.node.frontmatter.slug}
            date={post.node.frontmatter.date}
            title={post.node.frontmatter.title}
            excerpt={post.node.frontmatter.excerpt}
            slug={post.node.frontmatter.slug}
          />
        ))}
      </Content>
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </Container>
  )
}

export default tags

export const tagQuery = graphql`
  query TagsQuery($skip: Int!, $limit: Int!, $tag: String!) {
    allMdx(
      limit: $limit
      skip: $skip
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            slug
            title
            date
            excerpt
            tags
          }
        }
      }
    }
  }
`
