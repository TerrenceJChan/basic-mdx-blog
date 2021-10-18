import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Container, Post, FeatureImage } from "../components"
import { H1 } from "../elements"

const singlePost = ({ data }) => {
    const featureImage = data.mdx.frontmatter.featureImage.childImageSharp.fixed

    return (
        <Container>
            <FeatureImage fixed={featureImage} />
            <Post>
                <H1 margin="0 0 2rem 0">{data.mdx.frontmatter.title}</H1>
            </Post>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Container>
    )
}

export default singlePost

export const pageQuery = graphql`
    query SinglePostQuery($id: String!) {
        mdx(id: { eq: $id }) {
            id
            body
            frontmatter {
                date
                excerpt
                slug
                title
                featureImage {
                    childImageSharp {
                        fixed {
                            base64
                            tracedSVG
                            aspectRatio
                            srcWebp
                            srcSetWebp
                            originalName
                        }
                    }
                }
            }
        }
    }
`