const pieceImages: { [key: string]: string } = {
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

interface ChessPieceProps {
  piece: string | null;
  cordI: number;
  cordJ: number;
  isLight: boolean;
  lightColor: string;
  darkColor: string;
  selectedPiece: { i: number; j: number } | null;
  onPieceClick: (i: number, j: number) => void;
}

export default function ChessPiece({
  piece,
  cordI,
  cordJ,
  isLight,
  lightColor,
  darkColor,
  selectedPiece,
  onPieceClick,
}: ChessPieceProps) {
  const isSelected = selectedPiece?.i === cordI && selectedPiece?.j === cordJ;

  return (
    <div
      className={`flex items-center justify-center w-full h-full ${
        isSelected ? "border-2 border-yellow-400" : ""
      }`}
      onClick={() => onPieceClick(cordI, cordJ)}
      style={{ backgroundColor: isLight ? lightColor : darkColor }}
    >
      {piece && (
        <img
          src={pieceImages[piece]}
          alt={piece}
          className="w-4/5 h-4/5 object-contain pointer-events-none"
          draggable={false}
          style={{ cursor: "grab" }}
        />
      )}
    </div>
  );
}
