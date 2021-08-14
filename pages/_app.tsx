import '../styles/global.css'

export default function App({ Component, pageProps }: { Component: React.ComponentType, pageProps: Record<string, unknown> }): JSX.Element {
  return <Component { ...pageProps } />
}

