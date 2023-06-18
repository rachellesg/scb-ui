/* eslint-disable jest/no-conditional-expect */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Grid from '../components/Grid'
import { Position } from '../types'

describe('Grid', () => {
  const position: Position = {
    x: 2,
    y: 3,
    f: 'NORTH'
  }

  it('renders the grid cells with the robot at the correct position', () => {
    render(<Grid gridSize={5} position={position} />)

    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      for (let colIndex = 0; colIndex < 5; colIndex++) {
        const cell = screen.getByTestId(`cell-${colIndex}-${rowIndex}`)
        expect(cell).toBeInTheDocument()

        if (position.x === colIndex && position.y === rowIndex) {
          expect(cell).toHaveClass('robot')
          expect(cell).toHaveStyle('border-top: 3px solid hotpink;')
        } else {
          expect(cell).not.toHaveClass('robot')
        }
      }
    }
  })
})
