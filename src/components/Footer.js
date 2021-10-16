import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import {
    FooterWrapper,
    FooterSocialWrapper,
    FooterSocialIcons
} from "../elements"

export const Footer = () => {

    const data = useStaticQuery(graphql`
        query{
            facebook: file(relativePath: {eq: "social-facebook.svg"}) {
                publicURL
            }
            instagram: file(relativePath: {eq: "social-instagram.svg"}) {
                publicURL
            }
            twitter: file(relativePath: {eq: "social-twitter.svg"}) {
                publicURL
            }
        }
    `
    )

    return (
        <FooterWrapper>
            <FooterSocialWrapper>
                <FooterSocialIcons>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={data.facebook.publicURL} alt="Facebook logo" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src={data.instagram.publicURL} alt="Instagram logo" />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={data.twitter.publicURL} alt="Tiwtter logo" />
                    </a>
                </FooterSocialIcons>
                <p>© Copyright</p>
            </FooterSocialWrapper>
        </FooterWrapper>
    )
}