export interface DosMessage {
    id: string;
    text: string;
  }
  
  export interface CommandHistory {
    commands: string[];
    currentIndex: number;
  }