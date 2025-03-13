"use client";

import React, { useState, useEffect, useRef } from 'react';

const ContentArea: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const initialMessages = [
    "Microsoft(R) Windows 95",
    "(C)Copyright Microsoft Corp 1981-1996.",
    "",
    "C:\\WINDOWS\\command.com /E:1024",
    "Starting a new copy of the Windows Command Interpreter...",
    "",
    "LEB95! 199999!!!",
    "LEB661: Welcome to my world!",
    "LEB601: Loading blog concept...",
    "LE999: Connecting to retro vibes...",
    "C:\\WINDOWS>"
  ];

  useEffect(() => {
    if (currentIndex < initialMessages.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, initialMessages[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines, currentInput]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // 현재 입력을 새 라인에 추가
      setLines(prev => [...prev, `C:\\WINDOWS>${currentInput}`]);
      // 명령어 처리 로직을 여기에 추가할 수 있습니다
      processCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'Backspace') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (e.key.length === 1) { // 일반 문자 입력
      setCurrentInput(prev => prev + e.key);
    }
  };

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    switch(cmd) {
      case 'help':
        setLines(prev => [...prev, 
          'Available commands:',
          'HELP     - Shows this help message',
          'CLS      - Clears the screen',
          'DIR      - Lists directory contents',
          'VERSION  - Shows Windows version',
          ''
        ]);
        break;
      case 'cls':
        setLines([`C:\\WINDOWS>`]);
        break;
      case 'version':
        setLines(prev => [...prev, 
          'Microsoft Windows [Version 95]',
          ''
        ]);
        break;
      case 'dir':
        setLines(prev => [...prev, 
          ' Volume in drive C is WINDOWS95',
          ' Volume Serial Number is 1234-5678',
          '',
          ' Directory of C:\\WINDOWS',
          '',
          'COMMAND  COM    54,619 11-23-95  1:00a',
          'SYSTEM   DAT    6,075  11-23-95  1:00a',
          'WIN      INI    4,321  11-23-95  1:00a',
          '        3 file(s)     65,015 bytes',
          '        0 dir(s)      1,020,888 bytes free',
          ''
        ]);
        break;
      default:
        setLines(prev => [...prev, 
          `Bad command or file name`,
          ''
        ]);
    }
    setLines(prev => [...prev, `C:\\WINDOWS>`]);
  };

  return (
    <div 
      className="win95-content w-full h-full overflow-auto"
      ref={contentRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      autoFocus
      style={{
        backgroundColor: '#000',
        color: '#fff',
        fontFamily: 'Consolas, Monaco, "Courier New", monospace',
        padding: '8px',
        flex: '1',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div className="flex-1">
        {lines.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
        <div>
          {currentIndex >= initialMessages.length && (
            <>
              C:\WINDOWS{'>'}{currentInput}
              <span className="dos-cursor">█</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentArea;