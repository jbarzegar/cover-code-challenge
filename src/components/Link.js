import React from "react"
import { Link as ReLink } from "rebass"
import { Link as WouterLink } from "wouter"

const Link = props => <ReLink as={WouterLink} {...props} />

export default Link
