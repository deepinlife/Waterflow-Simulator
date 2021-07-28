import React from 'react';
import { Row, Col } from 'antd';
import Draggable from 'react-draggable';

export const gridBlockIds = {}

export const RenderDraggableBlock = ({ id, activeDrags, onStart, onDrop }) => {
  const nodeRef = React.useRef(null);

  return (
    <Col>
      <div
        className="obstruction-block"
        style={{
          backgroundColor: "grey",
          border: "1px solid black"
        }}
      >
        {onDrop ? <Draggable
          axis="both"
          nodeRef={nodeRef}
          // handle={`#${id}-draggable`}
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[1, 1]}
          scale={1}
          {...onStart ? { onStart: onStart } : {}}
          onStop={onDrop(id)}
        >
          <div ref={nodeRef} className={`obstruction-block ${activeDrags ? "no-pointer-events" : ""}`} id={`${id}-draggable`} />
        </Draggable> : null}
      </div>
    </Col>
  )
}


export const MakeGrid = (rows, columns, obsPosOnGridKeys = []) => {

  let grid = []
  for (let i = 0; i < (rows + 1); i++) {
    const cols = [];
    for (let j = 0; j < columns; j++) {
      gridBlockIds[('' + i + j)] = true;
      cols.push(
        <Col
          id={('' + i + j)}
          key={('grid-column-' + i + j)}
          style={{
            width: 50,
            height: 50,
            border: i === rows ? 'none' : '1px solid',
            backgroundColor: obsPosOnGridKeys.includes(('' + i + j)) ? "black" : "unset"
          }
          }
        />,
      );
    }
    grid.push(<Row key={'grid-row-' + i}>{cols}</Row>)
  }
  return grid;
}

export const MakeObstructionGrid = (obstructions, activeDrags, onStart, onDrop) => {
  let grid = []
  let totalRows = Math.floor(obstructions / 2)
  for (let i = 0; i < totalRows; i++) {
    const cols = [];
    for (let j = 0; j < 2; j++) {
      let key = ('obstructions-column-' + i + j)
      cols.push(<RenderDraggableBlock id={('ob-' + i + j)} key={key} activeDrags={activeDrags} onStart={onStart} onDrop={onDrop} />);
    }
    grid.push(<Row
      key={'obstructions-row-' + i}
      gutter={[16]}
      style={{ marginBottom: 16 }}
    >
      {cols}
    </Row>)
  }
  // obstructions count is odd then add one more grid
  if (obstructions & 1) {
    grid.push(
      <Row key={"obstructions-row-last"} gutter={[16]} style={{ marginBottom: 16 }}>
        <RenderDraggableBlock id={`ob-${totalRows}0`} activeDrags={activeDrags} onStart={onStart} onDrop={onDrop} />
      </Row>
    )
  }
  return grid;
}

export const MakeStartPoint = (columns, startPoint, setStartPoint) => {

  const cols = [];
  for (let j = 0; j < columns; j++) {
    cols.push(
      <Col
        id={('' + j)}
        key={('start-point-' + j)}
        {...startPoint === j ? {
          style: {
            width: 50,
            height: 50,
            backgroundColor: "blue"
          }
        } : setStartPoint ? {
          onClick: () => setStartPoint(j),
          style: {
            width: 50,
            height: 50,
            border: '1px solid',
            backgroundColor: "lightblue"
          }
        } : {
          style: {
            width: 50,
            height: 50,
          }
        }
        }
      />,
    );
  }
  return (<Row key={'start-point-row-1'} style={{ marginBottom: setStartPoint ? 2 : 0 }}>{cols}</Row>)
}

