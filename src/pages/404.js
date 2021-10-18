import React from "react";
import { graphql } from "gatsby";
import { Container, Content, FeatureImage } from "../components"
import { H1, P } from "../elements";

const notFound = ({ data }) => {
    return (
        <Container>
            <FeatureImage fixed={data.imageSharp.fixed} />
            <Content>
                <H1 textAlign="center" margin="0 0 1rem 0">404 - This page doesn't exist.</H1>
                <P textAlign="center">We know, it's frustrating when it happens to us too.</P>
                <P textAlign="center">Please enjoy this doggo and try navigating from our home page!</P>
            </Content>
        </Container>
    )
}

export default notFound

export const notFoundQuery = graphql`
    query NotFoundQuery {
        imageSharp(fixed: {originalName: {eq: "404-doggo.jpg"}}) {
            fixed {
                ...GatsbyImageSharpFixed
            }
        }
    }
`