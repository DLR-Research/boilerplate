/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { ThemeProvider } from '@emotion/react'
import Head from 'next/head'
import { FaGithub, FaTwitter, FaDiscord, FaReddit } from 'react-icons/fa'

interface FlexProps {
  align?: string
  justify?: string
}

const Row = styled.div<FlexProps>`
display: flex;
${ props => props.align ? 'align-items: ' + props.align + ';' : '' }
${ props => props.justify ? 'justify-content: ' + props.justify + ';' : '' }
`

const Column = styled.div<FlexProps>`
display: flex;
flex-direction: column;
${ props => props.align ? 'align-items: ' + props.align + ';' : '' }
${ props => props.justify ? 'justify-content: ' + props.justify + ';' : '' }
`

interface CellProps {
  weight?: number
}

const Cell = styled.div<CellProps>`
flex: ${ props => props.weight || 1 }
`

const Container = styled.div`
font-family: 'Fira Code';

padding-top: 30px;
padding-left: 20px;
width: calc(100% - 40px);

@media (min-width: 769px) {
  padding-top: 60px;
  padding-left: 50px;
  width: 669px;
}

@media (min-width: 1025px) {
  padding-top: 90px;
  padding-left: 100px;
  width: 800px;
}
`

const Headline = styled.div`
font-size: 5rem;
font-weight: 800;
color: #222;
`

const Subtitle = styled.div`
font-size: 1.6rem;
color: #444;
`

const Socials = styled.div`
font-size: 1.5rem;

> * {
  color: #ccc;

  &:not(:first-child) {
    padding-left: .5rem;
  }

  &:not(:last-child) {
    padding-right: .5rem;
  }
}
`

interface SocialLinkProps {
  hoverColor: string
}

const SocialLink = styled.a<SocialLinkProps>`
&:hover {
  color: ${ props => props.hoverColor }
}

transition: .3s;
`

function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>DeSci &middot; Home</title>
      </Head>
      <Container>
        <Headline>
          DeSci
        </Headline>
        <Subtitle>
          Building a new research economy.
        </Subtitle>
        <br />
        <Socials>
          <SocialLink hoverColor='#333' href='https://github.com/DeSci'>
            <FaGithub />
          </SocialLink>
          <SocialLink hoverColor='#1da1f2' href='https://twitter.com/DeSciPub'>
            <FaTwitter />
          </SocialLink>
          <SocialLink hoverColor='#7289da' href='https://discord.gg/mgTdFFPvVN'>
          <FaDiscord />
            </SocialLink>
          <SocialLink hoverColor='#ff4500' href='https://www.reddit.com/r/DeSci/'>
            <FaReddit />
          </SocialLink>
        </Socials>
      </Container>
    </div>
  )
}

export default Home
