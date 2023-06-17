import React, { useEffect, useState } from 'react'

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
    let newPosition: Position | null = null

    if (position) {
      newPosition = { ...position }

      switch (f) {
        case 'NORTH':
          if (newPosition.y !== MAX_POSITION) {
            newPosition.y = (newPosition.y ?? 0) + 1
            setY(newPosition.y)
          }
          break
        case 'EAST':
          if (newPosition.x !== MAX_POSITION) {
            newPosition.x = (newPosition.x ?? 0) + 1
            setX(newPosition.x)
          }
          break
        case 'SOUTH':
          if (newPosition.y !== 0) {
            newPosition.y = (newPosition.y ?? 0) - 1
            setY(newPosition.y)
          }
          break
        case 'WEST':
          if (newPosition.x !== 0) {
            newPosition.x = (newPosition.x ?? 0) - 1
            setX(newPosition.x)
          }
          break
      }
    }

    setPosition(newPosition)
  }

  const handleRotateRight = () => {
    switch (f) {
      // if face north, rotate right will become
      case 'NORTH':
        setF('EAST')
        break
      case 'EAST':
        setF('SOUTH')
        break
      case 'SOUTH':
        setF('WEST')
        break
      case 'WEST':
        setF('NORTH')
        break
      default:
        return
    }
  }

  const handleRotateLeft = () => {
    switch (f) {
      case 'NORTH':
        setF('WEST')
        break
      case 'EAST':
        setF('NORTH')
        break
      case 'SOUTH':
        setF('EAST')
        break
      case 'WEST':
        setF('SOUTH')
        break
      default:
        return
    }
  }

  useEffect(() => {
    setPosition((prevPosition) => {
      if (prevPosition) {
        return { ...prevPosition, f: f as 'NORTH' | 'EAST' | 'SOUTH' | 'WEST' }
      }
      return null
    })
  }, [f])

  return (
    <>
      <div className="grid-container">
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

        {showReport && position !== null ? (
          <div className="output">
            Mr Roomba is currently at position{' '}
            <strong>
              ({position?.x}, {position?.y})
            </strong>{' '}
            facing <strong>{position?.f}</strong>
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="action-container">
        <div className="actions">
          <h2>Place Mr Roomba wherever you want!</h2>
          <div className="row">
            <label>
              Set X position (0-4)
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
              Set Y position (0-4)
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
              Set Direction
              <select value={f} onChange={(e) => setF(e.target.value)}>
                <option value="NORTH">NORTH</option>
                <option value="EAST">EAST</option>
                <option value="SOUTH">SOUTH</option>
                <option value="WEST">WEST</option>
              </select>
            </label>
          </div>
          <button className="primary" onClick={() => handlePlace(x, y, f)}>
            PLACE
          </button>

          {position === null ? (
            ''
          ) : (
            <>
              <h3>Action Buttons</h3>
              <div className="row">
                <button className="secondary" onClick={handleRotateLeft}>
                  ROTATE LEFT
                </button>
                <button className="secondary" onClick={handleRotateRight}>
                  ROTATE RIGHT
                </button>
                <button className="secondary" onClick={handleMove}>
                  MOVE
                </button>
                <button className="secondary" onClick={handleReport}>
                  REPORT
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
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
