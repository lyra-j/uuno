import Circle from '@/components/icons/editor/element/circle';
import CircleDotted from '@/components/icons/editor/element/circle-dotted';
import CircleWhite from '@/components/icons/editor/element/circle-white';
import LeftArrow from '@/components/icons/editor/element/left-arrow';
import LeftCircle from '@/components/icons/editor/element/left-circle';
import LeftDottedArrow from '@/components/icons/editor/element/left-dotted-arrow';
import LeftDottedCircle from '@/components/icons/editor/element/left-dotted-circle';
import LeftDottedSquare from '@/components/icons/editor/element/left-dotted-square';
import LeftDotted2Arrow from '@/components/icons/editor/element/left-dotted2-arrow';
import LeftDotted2Circle from '@/components/icons/editor/element/left-dotted2-circle';
import LeftDotted2Square from '@/components/icons/editor/element/left-dotted2-square';
import LeftRightArrow from '@/components/icons/editor/element/left-right-arrow';
import LeftRightCircle from '@/components/icons/editor/element/left-right-circle';
import LeftRightDottedArrow from '@/components/icons/editor/element/left-right-dotted-arrow';
import LeftRightDottedCircle from '@/components/icons/editor/element/left-right-dotted-circle';
import LeftRightDottedSquare from '@/components/icons/editor/element/left-right-dotted-square';
import LeftRightDotted2Arrow from '@/components/icons/editor/element/left-right-dotted2-arrow';
import LeftRightDotted2Circle from '@/components/icons/editor/element/left-right-dotted2-circle';
import LeftRightDotted2Square from '@/components/icons/editor/element/left-right-dotted2-square';
import LeftRightSquare from '@/components/icons/editor/element/left-right-square';
import LeftSquare from '@/components/icons/editor/element/left-square';
import Line from '@/components/icons/editor/element/line';
import LineDotted from '@/components/icons/editor/element/line-dotted';
import LineDotted2 from '@/components/icons/editor/element/line-dotted-2';
import RightArrow from '@/components/icons/editor/element/right-arrow';
import RightCircle from '@/components/icons/editor/element/right-circle';
import RightDottedArrow from '@/components/icons/editor/element/right-dotted-arrow';
import RightDottedCircle from '@/components/icons/editor/element/right-dotted-circle';
import RightDottedSquare from '@/components/icons/editor/element/right-dotted-square';
import RightDotted2Arrow from '@/components/icons/editor/element/right-dotted2-arrow';
import RightDotted2Circle from '@/components/icons/editor/element/right-dotted2-circle';
import RightDotted2Square from '@/components/icons/editor/element/right-dotted2-square';
import RightSquare from '@/components/icons/editor/element/right-square';
import Square from '@/components/icons/editor/element/square';
import SquareDotted from '@/components/icons/editor/element/square-dotted';
import SquareWhite from '@/components/icons/editor/element/square-white';
import Star4 from '@/components/icons/editor/element/star-4';
import Star5 from '@/components/icons/editor/element/star-5';
import Star6 from '@/components/icons/editor/element/star-6';
import Triangle from '@/components/icons/editor/element/triangle';
import TriangleDotted from '@/components/icons/editor/element/triangle-dotted';
import TriangleWhite from '@/components/icons/editor/element/triangle-white';
import { LineEndType } from '@/types/editor.type';
import { BASE_LINE, DASHED, DASHED2 } from './editor.constant';

/**
 * 일반 라인
 */
export const lineOptions: {
  Component: any;
  start: LineEndType;
  end: LineEndType;
  fill: string;
  dashed: number[];
}[] = [
  {
    Component: Line,
    start: 'none',
    end: 'none',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: RightArrow,
    start: 'none',
    end: 'arrow',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: LeftArrow,
    start: 'arrow',
    end: 'none',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: LeftRightArrow,
    start: 'arrow',
    end: 'arrow',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: RightCircle,
    start: 'none',
    end: 'circle',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: LeftCircle,
    start: 'circle',
    end: 'none',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: LeftRightCircle,
    start: 'circle',
    end: 'circle',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: RightSquare,
    start: 'none',
    end: 'rectangle',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: LeftSquare,
    start: 'rectangle',
    end: 'none',
    fill: 'black',
    dashed: BASE_LINE,
  },
  {
    Component: LeftRightSquare,
    start: 'rectangle',
    end: 'rectangle',
    fill: 'black',
    dashed: BASE_LINE,
  },
];

/**
 * 점선 라인
 */
export const lineDottedOptions: {
  Component: any;
  start: LineEndType;
  end: LineEndType;
  dashed: number[];
  fill: string;
}[] = [
  {
    Component: LineDotted,
    start: 'none',
    end: 'none',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: RightDottedArrow,
    start: 'none',
    end: 'arrow',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: LeftDottedArrow,
    start: 'arrow',
    end: 'none',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: LeftRightDottedArrow,
    start: 'arrow',
    end: 'arrow',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: RightDottedCircle,
    start: 'none',
    end: 'circle',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: LeftDottedCircle,
    start: 'circle',
    end: 'none',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: LeftRightDottedCircle,
    start: 'circle',
    end: 'circle',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: RightDottedSquare,
    start: 'none',
    end: 'rectangle',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: LeftDottedSquare,
    start: 'rectangle',
    end: 'none',
    dashed: DASHED,
    fill: 'black',
  },
  {
    Component: LeftRightDottedSquare,
    start: 'rectangle',
    end: 'rectangle',
    dashed: DASHED,
    fill: 'black',
  },
];

/**
 * 촘촘한 점선 라인
 */
export const lineDotted2Options: {
  Component: any;
  start: LineEndType;
  end: LineEndType;
  dashed: number[];
  fill: string;
}[] = [
  {
    Component: LineDotted2,
    start: 'none',
    end: 'none',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: RightDotted2Arrow,
    start: 'none',
    end: 'arrow',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: LeftDotted2Arrow,
    start: 'arrow',
    end: 'none',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: LeftRightDotted2Arrow,
    start: 'arrow',
    end: 'arrow',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: RightDotted2Circle,
    start: 'none',
    end: 'circle',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: LeftDotted2Circle,
    start: 'circle',
    end: 'none',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: LeftRightDotted2Circle,
    start: 'circle',
    end: 'circle',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: RightDotted2Square,
    start: 'none',
    end: 'rectangle',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: LeftDotted2Square,
    start: 'rectangle',
    end: 'none',
    dashed: DASHED2,
    fill: 'black',
  },
  {
    Component: LeftRightDotted2Square,
    start: 'rectangle',
    end: 'rectangle',
    dashed: DASHED2,
    fill: 'black',
  },
];

/**
 * 사각형 모양
 */
export const squareOption: {
  Component: any;
  dashed: number[];
  fill: string;
}[] = [
  { Component: Square, dashed: BASE_LINE, fill: 'black' },
  {
    Component: SquareWhite,
    dashed: BASE_LINE,
    fill: 'rgba(0,0,0,0)',
  },
  {
    Component: SquareDotted,
    dashed: DASHED2,
    fill: 'rgba(0,0,0,0)',
  },
];

export const circleOption: {
  Component: any;
  dashed: number[];
  fill: string;
}[] = [
  { Component: Circle, dashed: BASE_LINE, fill: 'black' },
  {
    Component: CircleWhite,
    dashed: BASE_LINE,
    fill: 'rgba(0,0,0,0)',
  },
  {
    Component: CircleDotted,
    dashed: DASHED2,
    fill: 'rgba(0,0,0,0)',
  },
];

export const triangleOption: {
  Component: any;
  dashed: number[];
  fill: string;
  sides: number;
  radius: number;
}[] = [
  {
    Component: Triangle,
    dashed: BASE_LINE,
    fill: 'black',
    sides: 3,
    radius: 53,
  },
  {
    Component: TriangleWhite,
    dashed: BASE_LINE,
    fill: 'rgba(0,0,0,0)',
    sides: 3,
    radius: 53,
  },
  {
    Component: TriangleDotted,
    dashed: DASHED2,
    fill: 'rgba(0,0,0,0)',
    sides: 3,
    radius: 53,
  },
];

export const starOption: {
  Component: any;
  fill: string;
  numPoint: number;
  innerRadius: number;
  outerRadius: number;
  dashed: number[];
}[] = [
  {
    Component: Star4,
    fill: 'black',
    numPoint: 4,
    innerRadius: 20,
    outerRadius: 50,
    dashed: BASE_LINE,
  },
  {
    Component: Star5,
    fill: 'black',
    numPoint: 5,
    innerRadius: 20,
    outerRadius: 50,
    dashed: BASE_LINE,
  },
  {
    Component: Star6,
    fill: 'black',
    numPoint: 6,
    innerRadius: 30,
    outerRadius: 50,
    dashed: BASE_LINE,
  },
];
