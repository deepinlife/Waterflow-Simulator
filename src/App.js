import { useState } from 'react'
import './App.css';
import GridCreation from './components/grid-creation'
import DragObstruction from './components/drag-obstruction';

function App() {
  const [activeComp, setActiveCom] = useState("gridCreation")
  /** set required grid data like number of rows, columns and obstruction */
  const [gridData, setGridData] = useState({ rows: 1, columns: 1, obstructions: 1 })

  /** component shown on screen */
  const components = {
    "gridCreation": <GridCreation setGridData={setGridData} gridData={gridData} setActiveCom={setActiveCom} />,
    "dragObstruction": <DragObstruction
      gridData={gridData}
      setActiveCom={setActiveCom}
    />,
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Waterflow Simulator</h1>
        <div>
          {components[activeComp]}
        </div>
      </div>
    </div>
  );
}

export default App;
