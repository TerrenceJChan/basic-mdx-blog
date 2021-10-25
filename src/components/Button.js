import React from "react"
import { ButtonWrapper } from "../elements"
import { Link } from "gatsby"

export const Button = ({ children, href }) => {
  href = "/" + href
  return (
    <Link to={href}>
      <ButtonWrapper>{children}</ButtonWrapper>
    </Link>
  )
}
