import React, { useState } from 'react'

interface Position {
  x: number | null
  y: number | null
  f: 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'
}

const RobotVacuum: React.FC = () => {
  const [position, setPosition] = useState<Position | null>(null)
  const [showReport, setShowReport] = useState<boolean>(false)

  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)
  const [f, setF] = useState<string>('NORTH')

  const GRID_SIZE = 5
  const MAX_POSITION = GRID_SIZE - 1

  const handlePlace = (x: number, y: number, f: string) => {
    const placedPosition: Position = {
      x: x,
      y: y,
      f: f as 'NORTH' | 'EAST' | 'SOUTH' | 'WEST'
    }

    setPosition(placedPosition)
  }

  const handleReport = () => {
    setShowReport(true)
  }

  const handleMove = () => {
    console.log('PRESS MOVE')
  }

  const handleDirection = () => {
    console.log('change DIRECTIEON')
  }

  return (
    <div>
      <div className="actions">
        <div className="row">
          <label>
            Set X position:
            <input
              type="text"
              pattern="[0-4]"
              maxLength={1}
              value={x}
              onChange={(e) => {
                if (/^[0-4]$/.test(e.target.value)) {
                  setX(parseInt(e.target.value))
                }
              }}
            />
          </label>
          <label>
            Set Y position:
            <input
              type="text"
              pattern="[0-4]"
              maxLength={1}
              value={y}
              onChange={(e) => {
                if (/^[0-4]$/.test(e.target.value)) {
                  setY(parseInt(e.target.value))
                }
              }}
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
        </div>
        {position === null ? (
          ''
        ) : (
          <div className="row">
            <button onClick={handleMove}>MOVE</button>
          </div>
        )}
        <button onClick={handleReport}>REPORT</button>
      </div>

      <div className="grid">
        {(() => {
          const cells = []
          for (let rowIndex = MAX_POSITION; rowIndex >= 0; rowIndex--) {
            const row = []
            for (let colIndex = 0; colIndex < GRID_SIZE; colIndex++) {
              row.push(
                <div
                  key={colIndex}
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

      <div className="output">
        {showReport && position !== null
          ? `RESULT: X: ${position?.x} Y: ${position?.y} F: ${position?.f}`
          : ''}
      </div>
    </div>
  )
}

export default RobotVacuum

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
