import React, { useState } from 'react'

interface Position {
  x: number | null
  y: number | null
  f: 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'
  placed: boolean | false
}

const RobotVacuum: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null)

  const GRID_SIZE = 5

  const handlePlace = () => {
    const placedPosition: Position = {
      x: 0,
      y: 0,
      f: 'NORTH',
      placed: true
    }

    setPosition(placedPosition)
  }

  const handleReport = () => {
    console.log(position?.x, position?.y, position?.f)
  }

  return (
    <div>
      <button onClick={handlePlace}>PLACE</button>
      {!position ? (
        ''
      ) : (
        <div className="actions">
          <input
            type="text"
            pattern="\d*"
            maxLength={1}
            value={position?.x || 0}
            onChange={(e) => console.log(e.target.value)}
          />
          <button onClick={handleReport}>REPORT</button>
        </div>
      )}
      <div className="grid">
        {(() => {
          const cells = []
          for (let rowIndex = 0; rowIndex < GRID_SIZE; rowIndex++) {
            const row = []
            for (let colIndex = 0; colIndex < GRID_SIZE; colIndex++) {
              row.push(
                <div
                  key={colIndex}
                  className={`cell ${
                    position?.x === colIndex && position?.y === rowIndex ? 'robot' : ''
                  }`}
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
    </div>
  )
}

export default RobotVacuum
