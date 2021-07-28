import React from 'react';
import { Row, Col } from 'antd';
import Draggable from 'react-draggable';

/** grid block ids  */
export const gridBlockIds = {}

/**
 * Render Draggable grid block
 * @param {string} id - block id
 * @returns 
 */
export const RenderDraggableBlock = ({ id, activeDrags, onStart, onDrop, disabled }) => {
  const nodeRef = React.useRef(null);

  return (
    <Col>
      <div className="block-size obstruction-block grey-background">
        {onDrop ? <Draggable
          axis="both"
          disabled={disabled}
          nodeRef={nodeRef}
          // handle={`#${id}-draggable`}
          defaultPosition={{ x: 0, y: 0 }}
          position={null}
          grid={[1, 1]}
          scale={1}
          {...onStart ? { onStart: onStart } : {}}
          onStop={onDrop(id)}
        >
          <div ref={nodeRef} className={`block-size obstruction-block ${activeDrags ? "no-pointer-events" : ""}`} id={`${id}-draggable`} />
        </Draggable> : null}
      </div>
    </Col>
  )
}

/**
 * Generate grid view
 * based on numbers of rows and column
 * @param {*} rows 
 * @param {*} columns 
 * @param {*} obsPosOnGridKeys - obstruction keys on grid 
 * @returns 
 */
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
          className="block-size"
          style={{
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

/**
 * Generate obstruction grid view
 * based on number of obstructions
 * Here we display only 2 column grid
 * @param {*} obstructions 
 * @returns 
 */
export const MakeObstructionGrid = ({ obstructions, activeDrags, onStart, onDrop, disableDrag }) => {
  let grid = []
  let totalRows = Math.floor(obstructions / 2)
  for (let i = 0; i < totalRows; i++) {
    const cols = [];
    for (let j = 0; j < 2; j++) {
      let key = ('obstructions-column-' + i + j)
      cols.push(<RenderDraggableBlock
        id={('ob-' + i + j)}
        key={key}
        activeDrags={activeDrags}
        onStart={onStart}
        onDrop={onDrop}
        disabled={disableDrag}
      />);
    }
    grid.push(<Row
      key={'obstructions-row-' + i}
      gutter={[16]}
      style={{ marginBottom: 16 }}
    >
      {cols}
    </Row>)
  }
  /** obstructions count is odd then add one more grid */
  if (obstructions & 1) {
    grid.push(
      <Row key={"obstructions-row-last"} gutter={[16]} style={{ marginBottom: 16 }}>
        <RenderDraggableBlock
          id={`ob-${totalRows}0`}
          activeDrags={activeDrags}
          onStart={onStart}
          onDrop={onDrop}
          disabled={disableDrag}
        />
      </Row>
    )
  }
  return grid;
}

/**
 * Generate waterflow start point grid view
 * at top of main grid
 * @param {*} param0 
 * @returns 
 */
export const MakeStartPointGrid = ({ columns, startPoint, setStartPoint }) => {
  const cols = [];
  for (let j = 0; j < columns; j++) {
    cols.push(
      <Col
        id={('' + j)}
        key={('start-point-' + j)}
        className="block-size"
        {...!isNaN(startPoint) ? startPoint === j ? {
          style: {
            backgroundColor: "blue"
          }
        } : {} : {
          onClick: () => setStartPoint(j),
          style: {
            border: '1px solid',
            backgroundColor: "lightblue"
          }
        }}
      />,
    );
  }
  return (<Row key={'start-point-row-1'} id="start-point-row" style={{ marginBottom: isNaN(startPoint) ? 0 : 2 }}>{cols}</Row>)
}

