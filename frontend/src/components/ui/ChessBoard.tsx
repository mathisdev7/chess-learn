import { useEffect } from "react";
import { ThemeState, useThemeStore } from "../../store/themeStore";

interface PieceImages {
  [key: string]: string;
}

export default function ChessBoard() {
  const { lightColor, setLightColor, darkColor, setDarkColor, set } =
    useThemeStore();

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

  const pieceImages: PieceImages = {
    br: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/br.png",
    bn: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bn.png",
    bb: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bb.png",
    bq: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bq.png",
    bk: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bk.png",
    bp: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/bp.png",
    wr: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wr.png",
    wn: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wn.png",
    wb: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wb.png",
    wq: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wq.png",
    wk: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wk.png",
    wp: "https://images.chesscomfiles.com/chess-themes/pieces/neo/150/wp.png",
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
    <div className="flex flex-col items-center">
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
              const piece = piecePlacement[i][j];
              const isLight = (i + j) % 2 === 0;
              return (
                <div
                  key={j}
                  className="flex items-center justify-center"
                  style={{
                    backgroundColor: isLight ? lightColor : darkColor,
                    backgroundImage: piece
                      ? `url(${pieceImages[piece]})`
                      : "none",
                    backgroundSize: "80%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
