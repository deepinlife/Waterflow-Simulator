import React from 'react';
import { Slider, Button } from 'antd';


const rows = {};
const columns = {};
const obstructions = {};

[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((value, i) => {
  rows[i] = value;
});
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((value, i) => {
  columns[i] = value;
});
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((value, i) => {
  obstructions[i] = value;
});

const RenderSlider = ({ title, marks, onChange, value }) => (
  <div>
    <span>{title}</span>
    <div>
      <Slider
        min={0}
        max={Object.keys(marks).length - 1}
        value={value}
        onChange={onChange}
        marks={marks}
        step={null}
        tipFormatter={value => marks[value]}
      />
    </div>
  </div>
)


const GridCreation = ({ gridData, setGridData, setActiveCom }) => (
  <div className="grid-creation">
    <h2>Grid Creation</h2>
    <div style={{ marginTop: 10 }}>
      <RenderSlider
        title="Number of rows"
        value={gridData['rows']}
        marks={rows}
        onChange={(value) => setGridData((prev) => ({ ...prev, rows: value }))}
      />
      <RenderSlider
        title="Number of columns"
        value={gridData['columns']}
        marks={columns}
        onChange={(value) => setGridData((prev) => ({ ...prev, columns: value }))}
      />
      <RenderSlider
        title="Number of obstructions"
        value={gridData['obstructions']}
        marks={obstructions}
        onChange={(value) => setGridData((prev) => ({ ...prev, obstructions: value }))}
      />
    </div>
    <Button
      type="primary"
      style={{ marginTop: 30 }}
      onClick={() => setActiveCom("dragObstruction")}
    >
      Next
    </Button>
  </div>
)

export default GridCreation;