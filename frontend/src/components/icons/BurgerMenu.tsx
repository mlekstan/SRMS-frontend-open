export default function BurgerMenu({ width = '24px', height = '24px', fill = '#5f6368' }: { fill: string, width: string, height: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={width} height={height} fill={fill}>
      <g id="_01_align_center" data-name="01 align center">
        <rect y="11" width="24" height="2"/>
        <rect y="4" width="24" height="2"/>
        <rect y="18" width="24" height="2"/>
      </g>
    </svg>

  );
}