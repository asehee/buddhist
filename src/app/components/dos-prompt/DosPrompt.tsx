"use client";

import React, { useState, useRef, useEffect } from 'react';
import WindowControls from './WindowControls';
import Toolbar from './Toolbar';
import ContentArea from './ContentArea';
import '../../styles/win95.css';

const DosPrompt: React.FC = () => {
  // 초기 창 크기를 더 크게 설정 (1024x600으로 변경)
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 600 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStartPos, setResizeStartPos] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  // 리사이징 시작
  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setResizeStartPos({
      x: e.clientX,
      y: e.clientY
    });
  };

  // 리사이징 끝
  const stopResize = () => {
    setIsResizing(false);
  };

  // 리사이징 중
  const resize = (e: MouseEvent) => {
    if (!isResizing) return;
    
    const deltaWidth = e.clientX - resizeStartPos.x;
    const deltaHeight = e.clientY - resizeStartPos.y;
    
    setWindowSize(prevSize => ({
      width: Math.max(300, prevSize.width + deltaWidth), // 최소 너비
      height: Math.max(200, prevSize.height + deltaHeight) // 최소 높이
    }));
    
    setResizeStartPos({ x: e.clientX, y: e.clientY });
  };

  // 마우스 이벤트 리스너
  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    }
    
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResize);
    };
  }, [isResizing, resizeStartPos]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div 
        ref={windowRef}
        className="win95-window relative flex flex-col" 
        style={{
          width: `${windowSize.width}px`,
          height: `${windowSize.height}px`
        }}
      >
        <div className="win95-title-bar flex items-center">
          <img 
            src="/api/placeholder/16/16" 
            alt="DOS Icon" 
            className="mr-2 w-4 h-4"
          />
          <span className="flex-grow">MS-DOS Prompt</span>
          <WindowControls />
        </div>
        <Toolbar />
        <div className="flex-1 overflow-hidden">
          <ContentArea />
        </div>
        
        {/* 리사이즈 핸들 - 오른쪽 하단 모서리 */}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={startResize}
          style={{
            backgroundImage: 'url(/resize-handle.png)', // 리사이즈 핸들 이미지가 있다면 추가
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            zIndex: 10
          }}
        />
      </div>
    </div>
  );
};

export default DosPrompt;