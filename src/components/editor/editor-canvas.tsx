import { Layer, Rect, Stage } from 'react-konva';

interface CanvasSizeProps {
  canvasSize: { width: number; height: number };
}

const EditorCanvas = ({ canvasSize }: CanvasSizeProps) => {
  const { width, height } = canvasSize;
  if (width === 0 || height === 0) return;

  return (
    <Stage width={width} height={height - 64}>
      <Layer>
        <Rect
          x={(width - 600) / 2}
          y={80}
          width={600}
          height={400}
          fill='#fff'
          stroke='#ddd'
          strokeWidth={1}
          shadowBlur={2}
          cornerRadius={8}
        />
      </Layer>
    </Stage>
  );
};

export default EditorCanvas;
