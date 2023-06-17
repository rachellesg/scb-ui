import React, { useState } from 'react'

interface Position {
  x: number | null
  y: number | null
  f: 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'
  placed: boolean | false
}

const RobotVacuum: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null)
  const [showReport, setShowReport] = useState<boolean>(false)

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [f, setF] = useState<string>('NORTH')

  const GRID_SIZE = 5

  const handlePlace = (x: number, y: number, f: string) => {
    const placedPosition: Position = {
      x: x,
      y: y,
      f: f as 'NORTH' | 'EAST' | 'SOUTH' | 'WEST',
      placed: true
    }

    setPosition(placedPosition)
  }

  const handleReport = () => {
    setShowReport(!showReport)
  }

  return (
    <div>
      <button onClick={() => handlePlace(0, 0, 'NORTH')}>PLACE</button>

      {!position ? (
        ''
      ) : (
        <div className="actions">
          <label>
            Set X position:
            <input
              type="text"
              pattern="\d*"
              maxLength={1}
              value={x}
              onChange={(e) => setX(parseInt(e.target.value))}
            />
          </label>
          <label>
            Set Y position:
            <input
              type="text"
              pattern="\d*"
              maxLength={1}
              value={y}
              onChange={(e) => setY(parseInt(e.target.value))}
            />
          </label>
          <label>
            Set Direction:
            <select value={f} onChange={(e) => setF(e.target.value)}>
              <option value="NORTH">North</option>
              <option value="EAST">EAST</option>
              <option value="SOUTH">SOUTH</option>
              <option value="WEST">WEST</option>
            </select>
          </label>
          <button onClick={() => handlePlace(x, y, f)}>PLACE</button>
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
      {showReport && position !== null
        ? `X: ${position?.x} Y: ${position?.y} F: ${position?.f}`
        : ''}
    </div>
  )
}

export default RobotVacuum
