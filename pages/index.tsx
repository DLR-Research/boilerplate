/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import Head from 'next/head'
import { FaGithub, FaTwitter, FaDiscord, FaReddit } from 'react-icons/fa'

const Container = styled.div`
font-family: 'Fira Code';

padding-top: 3rem;
padding-left: 2rem;
width: calc(100% - 40px);

@media (min-width: 769px) {
  padding-top: 6rem;
  padding-left: 5rem;
  width: 669px;
}

@media (min-width: 1025px) {
  padding-top: 9rem;
  padding-left: 10rem;
  width: 800px;
}
`

const TopText = styled.div`
> * {
  color: #eee;
  background: #333;
  margin-left: -1rem;
  padding: .5rem 1rem
}
`

const Headline = styled.div`
font-size: 5rem;
font-weight: 800;
display: inline-block;
`

const Subtitle = styled.div`
font-size: 1.6rem;
display: inline-block;
`

const Socials = styled.div`
font-size: 1.5rem;

> * {
  color: #bbb;

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
        <TopText>
          <Headline>
            DeSci
          </Headline>
          <br />
          <Subtitle>
            Building a new research economy.
          </Subtitle>
        </TopText>
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
