import { css, SerializedStyles } from '@emotion/react'
import styled from '@emotion/styled'

export interface FlexProps {
  align?: string
  justify?: string
}

export const Row = styled.div<FlexProps>`
display: flex;
${ props => props.align ? 'align-items: ' + props.align + ';' : '' }
${ props => props.justify ? 'justify-content: ' + props.justify + ';' : '' }
`

export const Column = styled.div<FlexProps>`
display: flex;
flex-direction: column;
${ props => props.align ? 'align-items: ' + props.align + ';' : '' }
${ props => props.justify ? 'justify-content: ' + props.justify + ';' : '' }
`

export interface CellProps {
  weight?: number
}

export const Cell = styled.div<CellProps>`
flex: ${ props => props.weight || 1 }
`

export function weight(w = 1): SerializedStyles {
  return css`
    flex: ${ w }
  `
}


