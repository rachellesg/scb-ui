import React from 'react'
import { Position } from '../types'

interface GridProps {
  position: Position | null
  gridSize: number
}

const Grid: React.FC<GridProps> = ({ position, gridSize }) => {
  const MAX_POSITION = gridSize - 1

  const robotBorderStyle = (direction: 'NORTH' | 'EAST' | 'SOUTH' | 'WEST') => {
    const style = '3px solid hotpink'
    switch (direction) {
      case 'NORTH':
        return { borderTop: style }
      case 'SOUTH':
        return { borderBottom: style }
      case 'EAST':
        return { borderRight: style }
      case 'WEST':
        return { borderLeft: style }
      default:
        return {}
    }
  }

  return (
    <div className="grid">
      {(() => {
        const cells = []
        for (let rowIndex = MAX_POSITION; rowIndex >= 0; rowIndex--) {
          const row = []
          for (let colIndex = 0; colIndex < gridSize; colIndex++) {
            row.push(
              <div
                key={colIndex}
                data-testid={`cell-${colIndex}-${rowIndex}`}
                className={`cell ${
                  position?.x === colIndex && position?.y === rowIndex ? 'robot ' : ''
                }`}
                style={
                  position?.x === colIndex && position?.y === rowIndex
                    ? robotBorderStyle(position?.f)
                    : undefined
                }
              ></div>
            )
          }
          cells.push(
            <div key={rowIndex} className="row">
              {row}
            </div>
          )
        }
        return cells
      })()}
    </div>
  )
}

export default Grid
