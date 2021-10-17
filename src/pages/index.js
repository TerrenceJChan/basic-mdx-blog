import React from "react"
import { Container, FeatureImage, Content, ContentCard } from "../components"

const IndexPage = () => {
  return (
    <Container>
      <FeatureImage />
      <Content>
        <ContentCard
          date="October 16, 2021"
          title="Our Content Card!"
          excerpt="Slowly but surely, we're building our first Gatsby blog up from scratch. It's been a journey, but the end result will be well worth it."
          slug="/our-content-card"
        />
      </Content>
    </Container>
  )
}

export default IndexPage