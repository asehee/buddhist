import React from 'react';

const Toolbar: React.FC = () => {
    return (
      <div className="win95-toolbar">
        <div className="win95-select-container">
          <select className="win95-select">
            <option>Auto</option>
          </select>
        </div>
        <div className="flex gap-1">
          <button className="win95-button">
            <img src="/icons/select.png" alt="Select" />
          </button>
          <button className="win95-button">
            <img src="/icons/copy.png" alt="Copy" />
          </button>
          <button className="win95-button">
            <img src="/icons/paste.png" alt="Paste" />
          </button>
          <button className="win95-button">
            <img src="/icons/help.png" alt="Help" />
          </button>
          <button className="win95-button">
            <img src="/icons/graph.png" alt="Graph" />
          </button>
          <button className="win95-button">
            <img src="/icons/terminal.png" alt="Terminal" />
          </button>
          <button className="win95-button">A</button>
        </div>
      </div>
    );
  };
export default Toolbar;