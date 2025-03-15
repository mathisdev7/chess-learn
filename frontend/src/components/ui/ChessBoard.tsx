import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeState, useThemeStore } from "../../store/themeStore";
import ChessPiece from "./ChessPiece";

export default function ChessBoard() {
  const piecePlacement = [
    ["br", "bn", "bb", "bq", "bk", "bb", "bn", "br"],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    ["wr", "wn", "wb", "wq", "wk", "wb", "wn", "wr"],
  ];
  const [boardState, setBoardState] =
    useState<(string | null)[][]>(piecePlacement);
  const { lightColor, setLightColor, darkColor, setDarkColor, set } =
    useThemeStore();
  const [selectedPiece, setSelectedPiece] = useState<{
    i: number;
    j: number;
  } | null>(null);

  const handlePieceClick = (i: number, j: number) => {
    if (selectedPiece) {
      handlePieceMove(selectedPiece.i, selectedPiece.j, i, j);
      setSelectedPiece(null);
    } else if (boardState[i][j]) {
      setSelectedPiece({ i, j });
    }
  };

  const handlePieceMove = (
    fromI: number,
    fromJ: number,
    toI: number,
    toJ: number
  ) => {
    if (boardState[toI][toJ]) return;
    const newBoard = boardState.map((row) => [...row]);
    newBoard[toI][toJ] = newBoard[fromI][fromJ];
    newBoard[fromI][fromJ] = null;
    setBoardState(newBoard);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      set((state: ThemeState) => ({
        ...state,
        darkColor: localStorage.getItem("darkColor") || "#353935",
        lightColor: localStorage.getItem("lightColor") || "#FF6347",
      }));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [set]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="mb-4 flex gap-4">
          <label className="flex items-center gap-2">
            Light Squares:
            <input
              type="color"
              value={lightColor}
              onChange={(e) => setLightColor(e.target.value)}
            />
          </label>
          <label className="flex items-center gap-2">
            Dark Squares:
            <input
              type="color"
              value={darkColor}
              onChange={(e) => setDarkColor(e.target.value)}
            />
          </label>
        </div>
        <div className="grid grid-rows-8 w-[640px] h-[640px] shadow-2xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="grid grid-cols-8">
              {Array.from({ length: 8 }).map((_, j) => {
                const piece = boardState[i][j];
                const isLight = (i + j) % 2 === 0;
                return (
                  <ChessPiece
                    key={`${i}-${j}`}
                    cordI={i}
                    cordJ={j}
                    piece={piece}
                    isLight={isLight}
                    lightColor={lightColor}
                    darkColor={darkColor}
                    selectedPiece={selectedPiece}
                    onPieceClick={handlePieceClick}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
