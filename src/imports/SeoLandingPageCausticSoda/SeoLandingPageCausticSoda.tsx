import svgPaths from "./svg-vs0bj699ix";
import { imgGroup } from "./svg-svce7";

function Overlay() {
  return (
    <div className="bg-[rgba(46,85,41,0.1)] content-stretch flex flex-col items-start px-[12px] py-[4px] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2e5529] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
        <p className="leading-[16px]">Industrial Grade</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.1504px] whitespace-nowrap">
        <p className="leading-[20px]">CAS 1310-73-2</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Container">
      <Overlay />
      <Container3 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[0.69px] relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Inter:Extra_Bold',sans-serif] font-extrabold justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-black tracking-[-1.2px] w-full">
        <p className="leading-[52.8px] mb-0">Caustic Soda</p>
        <p className="leading-[52.8px] text-[#2e5529]">Indonesia</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[1.1px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[18px] w-full">
        <p className="leading-[29.25px] mb-0">High-purity sodium hydroxide flakes and pearls sourced</p>
        <p className="leading-[29.25px] mb-0">directly from verified Indonesian manufacturers for</p>
        <p className="leading-[29.25px]">global export.</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[0.35px] uppercase w-full">
        <p className="leading-[20px]">Current Market Price</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[30px] text-black tracking-[-0.0586px] whitespace-nowrap">
        <p className="leading-[36px]">USD 380–420</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[16px] w-[35.34px]">
        <p className="leading-[24px]">/ MT</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[12px] items-end pb-[4px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Margin />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] w-[13.5px]">
        <p className="leading-[12px]">{`\uE098`}</p>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex gap-[8px] items-center px-[10px] py-[4px] relative rounded-[6px] shrink-0" data-name="Background">
      <Container8 />
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[12px] w-[169.242px]">
        <p className="leading-[16px]">+2.4% (30d) · Updated today</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f8fafc] relative rounded-[16px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.6)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[24px] py-[33.1px] relative size-full">
        <Container5 />
        <Container6 />
        <Background />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[8px] whitespace-nowrap">
        <p className="leading-[16px]">{`\uF061`}</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#3e7b27] content-stretch flex gap-[12px] items-center justify-center px-[32px] py-[16px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(62,123,39,0.3),0px_4px_6px_-4px_rgba(62,123,39,0.3)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[-0.0469px] whitespace-nowrap">
        <p className="leading-[24px]">Request Quotation</p>
      </div>
      <Container9 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col gap-[22.9px] items-start relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Heading />
      <Container4 />
      <BackgroundBorder />
      <Button />
    </div>
  );
}

function VerticalBorder() {
  return (
    <div className="col-0 justify-self-stretch relative row-0 self-start shrink-0" data-name="VerticalBorder">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[48px] relative size-full">
          <div className="absolute bg-[rgba(62,123,39,0.05)] blur-[32px] left-[-80px] rounded-[9999px] size-[256px] top-[-80px]" data-name="Overlay+Blur" />
          <Container1 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[rgba(226,232,240,0.5)] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black tracking-[0.0352px] whitespace-nowrap">
        <p className="leading-[28px]">Price Trend Analytics</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black text-center tracking-[0.2344px] whitespace-nowrap">
        <p className="leading-[16px]">30D</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[12px] text-center tracking-[0.2578px] whitespace-nowrap">
        <p className="leading-[16px]">90D</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center px-[16px] py-[6px] relative rounded-[6px] shrink-0" data-name="Button">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[12px] text-center tracking-[-0.0703px] whitespace-nowrap">
        <p className="leading-[16px]">180D</p>
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex items-start p-[4px] relative rounded-[8px] shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <BackgroundBorder1 />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Margin">
      <Container10 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[4.02%_2.66%_8.11%_6.69%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 676.996 436.996">
        <g id="Group">
          <g id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[0_-0.02%_3.99%_3.95%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 717.496 477.496">
        <g id="Group">
          <g id="Vector" />
          <g id="Vector_2" />
          <g id="Vector_3" />
          <g id="Vector_4" />
          <g id="Vector_5" />
          <g id="Vector_6" />
          <g id="Vector_7" />
          <g id="Vector_8" />
          <g id="Vector_9" />
          <g id="Vector_10" />
          <g id="Vector_11" />
        </g>
      </svg>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[0_-0.02%_3.99%_3.95%]" data-name="Group">
      <Group2 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[9.31%_2.66%_18.43%_6.69%]" data-name="Group">
      <div className="absolute inset-[-0.14%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 676.996 360.337">
          <g id="Group">
            <g id="Vector">
              <path d="M0 359.837H676.996Z" fill="var(--fill-0, black)" />
              <path d="M0 359.837H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
            <g id="Vector_2">
              <path d="M0 308.508H676.996Z" fill="var(--fill-0, black)" />
              <path d="M0 308.508H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
            <g id="Vector_3">
              <path d="M0 257.168H676.996Z" fill="var(--fill-0, black)" />
              <path d="M0 257.168H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
            <g id="Vector_4">
              <path d="M0 205.838H676.996Z" fill="var(--fill-0, black)" />
              <path d="M0 205.838H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
            <g id="Vector_5">
              <path d="M0 154.499H676.996Z" fill="var(--fill-0, black)" />
              <path d="M0 154.499H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
            <g id="Vector_6">
              <path d="M0 103.169H676.996Z" fill="var(--fill-0, black)" />
              <path d="M0 103.169H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
            <g id="Vector_7">
              <path d="M0 51.8296H676.996Z" fill="var(--fill-0, black)" />
              <path d="M0 51.8296H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
            <g id="Vector_8">
              <path d="M4.81878e-07 0.5H676.996Z" fill="var(--fill-0, black)" />
              <path d="M4.81878e-07 0.5H676.996" stroke="var(--stroke-0, #E2E8F0)" strokeOpacity="0.5" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[9.31%_2.66%_18.43%_6.69%]" data-name="Group">
      <Group6 />
    </div>
  );
}

function Group12() {
  return (
    <div className="absolute inset-[8.41%_2.66%_8.11%_6.69%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-21.83px] mask-size-[676.996px_436.996px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 676.996 415.167">
        <g id="Group">
          <path d={svgPaths.p269cc600} fill="var(--fill-0, #3E7B27)" fillOpacity="0.1" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents inset-[8.41%_2.66%_8.11%_6.69%]" data-name="Group">
      <Group12 />
    </div>
  );
}

function Group13() {
  return (
    <div className="absolute inset-[8.41%_2.66%_87.23%_6.69%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-21.83px] mask-size-[676.996px_436.996px]" style={{ maskImage: `url('${imgGroup}')` }} data-name="Group">
      <div className="absolute inset-[-6.92%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 677.237 24.6778">
          <g id="Group">
            <path d={svgPaths.p307f5240} id="Vector" stroke="var(--stroke-0, #3E7B27)" strokeMiterlimit="2" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents inset-[8.41%_2.66%_8.11%_6.69%]" data-name="Group">
      <Group11 />
      <Group13 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents inset-[8.41%_2.66%_8.11%_6.69%]" data-name="Group">
      <Group10 />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[8.41%_2.66%_8.11%_6.69%]" data-name="Group">
      <Group9 />
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[4.02%_2.66%_8.11%_6.69%]" data-name="Clip path group">
      <Group8 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[4.02%_2.66%_8.11%_6.69%]" data-name="Group">
      <ClipPathGroup />
    </div>
  );
}

function Group16() {
  return (
    <div className="absolute contents font-['Inter:Regular',sans-serif] font-normal inset-[92.09%_88.1%_2.88%_7.74%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-center whitespace-nowrap" data-name="Group">
      <p className="absolute inset-[92.09%_88.1%_5.5%_7.74%]">Apr 19</p>
      <p className="absolute inset-[94.7%_88.51%_2.88%_8.15%]">2026</p>
    </div>
  );
}

function Group15() {
  return (
    <div className="absolute contents inset-[92.09%_88.1%_2.88%_7.74%]" data-name="Group">
      <Group16 />
    </div>
  );
}

function Group17() {
  return (
    <div className="absolute contents inset-[92.09%_66.16%_5.5%_29.56%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[92.09%_66.16%_5.5%_29.56%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-center whitespace-nowrap">Apr 26</p>
    </div>
  );
}

function Group18() {
  return (
    <div className="absolute contents inset-[92.09%_44.41%_5.5%_51.57%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[92.09%_44.41%_5.5%_51.57%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-center whitespace-nowrap">May 3</p>
    </div>
  );
}

function Group19() {
  return (
    <div className="absolute contents inset-[92.09%_22.26%_5.5%_73.19%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[92.09%_22.26%_5.5%_73.19%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-center whitespace-nowrap">May 10</p>
    </div>
  );
}

function Group20() {
  return (
    <div className="absolute contents inset-[92.09%_0.38%_5.5%_95.07%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[92.09%_0.38%_5.5%_95.07%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-center whitespace-nowrap">May 17</p>
    </div>
  );
}

function Group14() {
  return (
    <div className="absolute contents inset-[92.09%_0.38%_2.88%_7.74%]" data-name="Group">
      <Group15 />
      <Group17 />
      <Group18 />
      <Group19 />
      <Group20 />
    </div>
  );
}

function Group22() {
  return (
    <div className="absolute contents inset-[90.58%_93.44%_7.01%_4.82%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[90.58%_93.44%_7.01%_4.82%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$0</p>
    </div>
  );
}

function Group23() {
  return (
    <div className="absolute contents inset-[80.26%_93.44%_17.33%_4.02%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[80.26%_93.44%_17.33%_4.02%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$50</p>
    </div>
  );
}

function Group24() {
  return (
    <div className="absolute contents inset-[69.94%_93.44%_27.65%_3.35%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[69.94%_93.44%_27.65%_3.35%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$100</p>
    </div>
  );
}

function Group25() {
  return (
    <div className="absolute contents inset-[59.61%_93.44%_37.97%_3.35%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[59.61%_93.44%_37.97%_3.35%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$150</p>
    </div>
  );
}

function Group26() {
  return (
    <div className="absolute contents inset-[49.29%_93.44%_48.29%_3.21%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[49.29%_93.44%_48.29%_3.21%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$200</p>
    </div>
  );
}

function Group27() {
  return (
    <div className="absolute contents inset-[38.97%_93.44%_58.62%_3.21%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[38.97%_93.44%_58.62%_3.21%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$250</p>
    </div>
  );
}

function Group28() {
  return (
    <div className="absolute contents inset-[28.65%_93.44%_68.94%_3.08%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[28.65%_93.44%_68.94%_3.08%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$300</p>
    </div>
  );
}

function Group29() {
  return (
    <div className="absolute contents inset-[18.33%_93.44%_79.26%_3.08%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[18.33%_93.44%_79.26%_3.08%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$350</p>
    </div>
  );
}

function Group30() {
  return (
    <div className="absolute contents inset-[8.01%_93.44%_89.58%_3.08%]" data-name="Group">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.01%_93.44%_89.58%_3.08%] leading-[normal] not-italic text-[#5d5d5d] text-[10px] text-right whitespace-nowrap">$400</p>
    </div>
  );
}

function Group21() {
  return (
    <div className="absolute contents inset-[8.01%_93.44%_7.01%_3.08%]" data-name="Group">
      <Group22 />
      <Group23 />
      <Group24 />
      <Group25 />
      <Group26 />
      <Group27 />
      <Group28 />
      <Group29 />
      <Group30 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[4.02%_0.38%_2.88%_3.08%]" data-name="Group">
      <Group5 />
      <Group7 />
      <Group14 />
      <Group21 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[4.02%_0.38%_2.88%_3.08%]" data-name="Group">
      <Group4 />
    </div>
  );
}

function Svg() {
  return (
    <div className="absolute h-[497.34px] left-0 overflow-clip top-0 w-[746.84px]" data-name="SVG">
      <Group />
      <Group1 />
      <Group3 />
    </div>
  );
}

function Svg1() {
  return <div className="absolute h-[497.34px] left-0 top-0 w-[746.84px]" data-name="SVG" />;
}

function Svg2() {
  return <div className="absolute h-[497.34px] left-0 top-0 w-[746.84px]" data-name="SVG" />;
}

function Container12() {
  return (
    <div className="h-[497.34px] relative shrink-0 w-full" data-name="Container">
      <Svg />
      <Svg1 />
      <Svg2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Container">
      <Container12 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-white col-0 justify-self-stretch relative row-0 self-start shrink-0" data-name="Background">
      <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
        <Margin1 />
        <Container11 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[623.34px] relative shrink-0 w-full" data-name="Container">
      <VerticalBorder />
      <Background1 />
    </div>
  );
}

function Section() {
  return (
    <div className="bg-white relative rounded-[32px] shrink-0 w-full" data-name="Section">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.5)] border-solid inset-0 pointer-events-none rounded-[32px] shadow-[0px_10px_30px_-5px_rgba(46,85,41,0.08)]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3e7b27] text-[20px] tracking-[10px] whitespace-nowrap">
        <p className="leading-[20px]">{`\uF3ED`}</p>
      </div>
    </div>
  );
}

function Overlay1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container15 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[0.4453px] whitespace-nowrap">
        <p className="leading-[32px]">47</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] tracking-[0.1094px] whitespace-nowrap">
        <p className="leading-[20px]">Verified Suppliers</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[120px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container14() {
  return (
    <div className="col-0 content-stretch flex gap-[16px] h-[52px] items-center justify-self-stretch relative row-0 self-center shrink-0" data-name="Container">
      <Overlay1 />
      <Container16 />
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3e7b27] text-[20px] tracking-[10px] whitespace-nowrap">
        <p className="leading-[20px]">{`\uF48B`}</p>
      </div>
    </div>
  );
}

function Overlay2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[0.1875px] whitespace-nowrap">
        <p className="leading-[32px]">20 MT</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] w-[93.336px]">
        <p className="leading-[20px]">Average MOQ</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[93.336px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container19() {
  return (
    <div className="col-0 content-stretch flex gap-[16px] h-[52px] items-center justify-self-stretch relative row-0 self-center shrink-0" data-name="Container">
      <Overlay2 />
      <Container21 />
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#3e7b27] text-[20px] tracking-[10px] whitespace-nowrap">
        <p className="leading-[20px]">{`\uF0AC`}</p>
      </div>
    </div>
  );
}

function Overlay3() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[48px]" data-name="Overlay">
      <Container25 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-white tracking-[-0.5859px] whitespace-nowrap">
        <p className="leading-[32px]">12+</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0.7)] tracking-[-0.0547px] whitespace-nowrap">
        <p className="leading-[20px]">Export Destinations</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[131px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container24() {
  return (
    <div className="col-0 content-stretch flex gap-[16px] h-[52px] items-center justify-self-stretch relative row-0 self-center shrink-0" data-name="Container">
      <Overlay3 />
      <Container26 />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[8px] whitespace-nowrap">
        <p className="leading-[16px]">{`\uF061`}</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex gap-[8px] h-full items-center relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-white tracking-[0.0156px] whitespace-nowrap">
        <p className="leading-[24px]">View All Suppliers</p>
      </div>
      <Container30 />
    </div>
  );
}

function Container29() {
  return (
    <div className="col-0 content-stretch flex h-[24px] items-start justify-end justify-self-stretch relative row-0 self-center shrink-0" data-name="Container">
      <Link />
    </div>
  );
}

function Container13() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[136px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <div className="bg-[rgba(255,255,255,0.2)] col-0 h-[48px] relative row-0 self-center shrink-0 w-px" data-name="Vertical Divider" />
      <Container19 />
      <div className="bg-[rgba(255,255,255,0.2)] col-0 h-[48px] relative row-0 self-center shrink-0 w-px" data-name="Vertical Divider" />
      <Container24 />
      <Container29 />
    </div>
  );
}

function Section1() {
  return (
    <div className="bg-black relative rounded-[24px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-full" data-name="Section">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-[32px] relative size-full">
          <div className="absolute bottom-0 left-1/2 opacity-10 right-0 top-0" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 696 200\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(70.315 0 0 70.315 696 100)\\'><stop stop-color=\\'rgba(255,255,255,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(255,255,255,0)\\' offset=\\'0.5\\'/></radialGradient></defs></svg>')" }} data-name="Gradient" />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Heading 3">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[24px] text-black tracking-[0.0234px] whitespace-nowrap">
        <p className="leading-[32px]">Quick Specifications</p>
      </div>
    </div>
  );
}

function Cell() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16px] relative shrink-0 w-[283.77px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[16px] w-[107.164px]">
        <p className="leading-[normal]">Purity (NaOH)</p>
      </div>
    </div>
  );
}

function Data() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16px] relative shrink-0 w-[567.56px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[64.23px]">
        <p className="leading-[normal]">≥ 99.0%</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(226,232,240,0.5)] border-b border-solid inset-0 pointer-events-none" />
      <Cell />
      <Data />
    </div>
  );
}

function Cell1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[16.5px] relative shrink-0 w-[283.77px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[16px] w-[47.137px]">
        <p className="leading-[normal]">Grade</p>
      </div>
    </div>
  );
}

function Data1() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[16.5px] relative shrink-0 w-[567.56px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[213.162px]">
        <p className="leading-[normal]">Industrial / Technical Grade</p>
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(226,232,240,0.5)] border-b border-solid inset-0 pointer-events-none" />
      <Cell1 />
      <Data1 />
    </div>
  );
}

function Cell2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[16.5px] relative shrink-0 w-[283.77px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[16px] w-[39.252px]">
        <p className="leading-[normal]">Form</p>
      </div>
    </div>
  );
}

function Data2() {
  return (
    <div className="content-stretch flex flex-col items-start px-[16px] py-[16.5px] relative shrink-0 w-[567.56px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[154.621px]">
        <p className="leading-[normal]">Flakes, Pearls, Solid</p>
      </div>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-center mb-[-1px] relative shrink-0 w-full" data-name="Row">
      <div aria-hidden="true" className="absolute border-[rgba(226,232,240,0.5)] border-b border-solid inset-0 pointer-events-none" />
      <Cell2 />
      <Data2 />
    </div>
  );
}

function Cell3() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16px] relative shrink-0 w-[283.77px]" data-name="Cell">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[16px] w-[154.119px]">
        <p className="leading-[normal]">Standard Packaging</p>
      </div>
    </div>
  );
}

function Data3() {
  return (
    <div className="content-stretch flex flex-col items-start p-[16px] relative shrink-0 w-[567.56px]" data-name="Data">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[20px] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black w-[298.116px]">
        <p className="leading-[normal]">25kg PP/PE Bags, 1000kg Jumbo Bags</p>
      </div>
    </div>
  );
}

function Row3() {
  return (
    <div className="content-stretch flex items-start justify-center relative shrink-0 w-full" data-name="Row">
      <Cell3 />
      <Data3 />
    </div>
  );
}

function TableBody() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-auto relative shrink-0 w-full" data-name="Table → Body">
      <Row />
      <Row1 />
      <Row2 />
      <Row3 />
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white col-0 justify-self-stretch relative rounded-[24px] row-0 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.5)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start pb-[54px] pt-[32px] px-[32px] relative size-full">
        <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[24px] shadow-[0px_4px_20px_-2px_rgba(0,0,0,0.05)]" data-name="Overlay+Shadow" />
        <Heading2 />
        <TableBody />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-black w-full">
        <p className="leading-[28px]">{`Compliance & Certifications`}</p>
      </div>
    </div>
  );
}

function Heading3Margin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[24px] relative shrink-0 w-full" data-name="Heading 3:margin">
      <Heading3 />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2563eb] text-[18px] tracking-[8.9824px] whitespace-nowrap">
        <p className="leading-[18px]">{`\uF56C`}</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#eff6ff] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container32 />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black tracking-[0.0547px] whitespace-nowrap">
        <p className="leading-[20px]">SDS Available</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[12px] tracking-[-0.0117px] whitespace-nowrap">
        <p className="leading-[16px]">Safety Data Sheets provided</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[162px]" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function BackgroundBorderShadow() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Background2 />
          <Container33 />
        </div>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#16a34a] text-[18px] w-[18.112px]">
        <p className="leading-[18px]">{`\uF06C`}</p>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#f0fdf4] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container36 />
    </div>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.0547px] whitespace-nowrap">
        <p className="leading-[20px]">REACH Compliant</p>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[12px] tracking-[0.0469px] whitespace-nowrap">
        <p className="leading-[16px]">EU market ready</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[122px]" data-name="Container">
      <Container38 />
      <Container39 />
    </div>
  );
}

function BackgroundBorderShadow1() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Background3 />
          <Container37 />
        </div>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#059669] text-[18px] tracking-[9px] whitespace-nowrap">
        <p className="leading-[18px]">{`\uF0A3`}</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#ecfdf5] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[40px]" data-name="Background">
      <Container40 />
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black tracking-[0.041px] whitespace-nowrap">
        <p className="leading-[20px]">Halal Certified</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[12px] tracking-[0.0469px] whitespace-nowrap">
        <p className="leading-[16px]">MUI certified options</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[120px]" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function BackgroundBorderShadow2() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[12px] shrink-0 w-full" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.3)] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[16px] relative size-full">
          <Background4 />
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundBorderShadow />
      <BackgroundBorderShadow1 />
      <BackgroundBorderShadow2 />
    </div>
  );
}

function BackgroundBorder3() {
  return (
    <div className="bg-[#f8fafc] col-0 justify-self-stretch relative rounded-[24px] row-0 self-start shrink-0" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[rgba(226,232,240,0.5)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[32px] relative size-full">
          <Heading3Margin />
          <Container31 />
        </div>
      </div>
    </div>
  );
}

function Section2() {
  return (
    <div className="gap-x-[32px] gap-y-[32px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[repeat(2,minmax(0,1fr))] h-[388px] pb-[16px] relative shrink-0 w-full" data-name="Section">
      <BackgroundBorder2 />
      <BackgroundBorder3 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#2e5529] text-[14px] tracking-[0.7px] uppercase w-[16.553px]">
        <p className="leading-[14px]">{`\uF200`}</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Container">
      <Container46 />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2e5529] text-[14px] tracking-[0.7px] uppercase w-[131.833px]">
        <p className="leading-[20px]">Market Insight</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black w-full">
        <p className="leading-[29.25px] mb-0">{`"Supply remains tight due to scheduled maintenance in major SEA plants. Prices are expected to hold firm through Q3 with`}</p>
        <p className="leading-[29.25px]">{`strong demand from alumina and pulp sectors."`}</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start min-w-px relative" data-name="Container">
      <Container45 />
      <Container47 />
    </div>
  );
}

function Link1() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col items-start px-[24px] py-[12px] relative rounded-[9999px] shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border border-[rgba(46,85,41,0.3)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2e5529] text-[16px] tracking-[0.0313px] whitespace-nowrap">
        <p className="leading-[24px]">Read Full Report →</p>
      </div>
    </div>
  );
}

function Section3() {
  return (
    <div className="bg-[rgba(46,85,41,0.05)] relative rounded-[24px] shrink-0 w-full" data-name="Section">
      <div aria-hidden="true" className="absolute border border-[rgba(46,85,41,0.2)] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-between p-[32px] relative size-full">
          <Container44 />
          <Link1 />
        </div>
      </div>
    </div>
  );
}

function Main() {
  return (
    <div className="relative shrink-0 w-full" data-name="Main">
      <div className="content-stretch flex flex-col gap-[64px] items-start pb-[80px] pt-[112px] px-[24px] relative size-full">
        <Section />
        <Section1 />
        <Section2 />
        <Section3 />
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#2e5529] content-stretch flex items-center justify-center pb-[6.5px] pt-[5.5px] relative rounded-[8px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.5742px] whitespace-nowrap">
        <p className="leading-[20px]">TC</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-black tracking-[0.0781px] whitespace-nowrap">
        <p className="leading-[24px]">TradeChem</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Background5 />
      <Container50 />
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[0.3691px] whitespace-nowrap">
        <p className="leading-[20px]">Terms</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[0.2598px] whitespace-nowrap">
        <p className="leading-[20px]">Privacy</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[-0.0273px] whitespace-nowrap">
        <p className="leading-[20px]">Contact Support</p>
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[24px] h-[20px] items-start relative shrink-0" data-name="Container">
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

function Container52() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(93,93,93,0.6)] w-[264.793px]">
        <p className="leading-[20px]">© 2026 TradeChem. All rights reserved.</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[24px] relative size-full">
          <Container49 />
          <Container51 />
          <Container52 />
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start py-[48px] relative shrink-0 w-full" data-name="Footer">
      <div aria-hidden="true" className="absolute border-[rgba(226,232,240,0.5)] border-solid border-t inset-0 pointer-events-none" />
      <Container48 />
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#2e5529] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[40px]" data-name="Background">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-center text-white tracking-[-1px] whitespace-nowrap">
        <p className="leading-[28px]">TC</p>
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[#2e5529] text-[24px] tracking-[-0.6px] whitespace-nowrap">
        <p className="leading-[32px]">TradeChem</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Link">
      <Background6 />
      <Container55 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[12px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Font_Awesome_5_Free:Solid',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[16px] text-[rgba(93,93,93,0.6)] tracking-[8px] whitespace-nowrap">
        <p className="leading-[16px]">{`\uF002`}</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(93,93,93,0.5)] w-full">
        <p className="leading-[normal]">Search chemicals, CAS numbers...</p>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px overflow-clip pb-[2px] pt-px relative" data-name="Input">
      <Container56 />
    </div>
  );
}

function BackgroundBorderShadow3() {
  return (
    <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center px-[16px] py-[10px] relative rounded-[9999px] shrink-0 w-[400px]" data-name="Background+Border+Shadow">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <Margin2 />
      <Input />
    </div>
  );
}

function Container54() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-name="Container">
      <Link5 />
      <BackgroundBorderShadow3 />
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] tracking-[0.0547px] whitespace-nowrap">
        <p className="leading-[20px]">Categories</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#5d5d5d] text-[14px] w-[46.204px]">
        <p className="leading-[20px]">Sign In</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#3e7b27] content-stretch flex flex-col items-center justify-center px-[24px] py-[10px] relative rounded-[9999px] shrink-0" data-name="Button">
      <div className="absolute bg-[rgba(255,255,255,0)] inset-0 rounded-[9999px] shadow-[0px_10px_15px_-3px_rgba(62,123,39,0.3),0px_4px_6px_-4px_rgba(62,123,39,0.3)]" data-name="Button:shadow" />
      <div className="flex flex-col font-['Inter:Bold',sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-center text-white tracking-[0.082px] whitespace-nowrap">
        <p className="leading-[20px]">Post RFQ</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Container">
      <Link6 />
      <Link7 />
      <Button4 />
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[80px] max-w-[1440px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center max-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between max-w-[inherit] px-[24px] relative size-full">
          <Container54 />
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function Nav() {
  return (
    <div className="absolute backdrop-blur-[5px] bg-[rgba(255,255,255,0.95)] content-stretch flex flex-col items-start left-0 top-0 w-[1440px]" data-name="Nav">
      <div aria-hidden="true" className="absolute border-[rgba(226,232,240,0.8)] border-b border-solid inset-0 pointer-events-none" />
      <Container53 />
    </div>
  );
}

export default function SeoLandingPageCausticSoda() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col items-start relative size-full" data-name="SEO Landing Page - Caustic Soda">
      <Main />
      <Footer />
      <Nav />
    </div>
  );
}