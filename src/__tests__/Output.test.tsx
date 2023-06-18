import React from 'react'
import { render, screen } from '@testing-library/react'
import ReportOutput from '../components/Output'
import { Position } from '../types'

describe('ReportOutput', () => {
  const position: Position = {
    x: 2,
    y: 3,
    f: 'NORTH'
  }

  it('renders the correct output', () => {
    render(<ReportOutput position={position} />)

    const outputText = screen.getByText(/Mr Roomba is currently at position/i)
    const positionText = screen.getByText(/\(2, 3\)/)
    const directionText = screen.getByText(/NORTH/i)

    expect(outputText).toBeInTheDocument()
    expect(positionText).toBeInTheDocument()
    expect(directionText).toBeInTheDocument()
  })
})
