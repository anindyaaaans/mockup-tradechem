function Group1() {
  return (
    <div className="absolute contents left-[87px] top-[219.12px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[87px] not-italic text-[18px] text-black top-[219.12px] whitespace-nowrap">#2E5529</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[65px] top-[114px]">
      <div className="absolute bg-[#2e5529] h-[89px] left-[65px] top-[114px] w-[121px]" />
      <Group1 />
    </div>
  );
}

function PrimAryColor() {
  return (
    <div className="absolute contents left-[65px] top-[114px]" data-name="PRIMAry color">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[65px] top-[279px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[80px] not-italic text-[18px] text-black top-[389px] whitespace-nowrap">#3E7B27</p>
      <div className="absolute bg-[#3e7b27] h-[89px] left-[65px] top-[279px] w-[121px]" />
    </div>
  );
}

function GreyColor() {
  return (
    <div className="absolute contents left-[264px] top-[114px]" data-name="grey color">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[283px] not-italic text-[18px] text-black top-[219px] whitespace-nowrap">#5D5D5D</p>
      <div className="absolute bg-[#5d5d5d] h-[89px] left-[264px] top-[114px] w-[121px]" />
    </div>
  );
}

function Text() {
  return (
    <div className="-translate-x-1/2 absolute contents left-[calc(50%-394.5px)] top-[288px]" data-name="text">
      <div className="absolute bg-[#5d5d5d] h-[89px] left-[265px] top-[288px] w-[121px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%-429px)] not-italic text-[18px] text-black top-[384.59px] whitespace-nowrap">303030</p>
    </div>
  );
}

export default function ProductDetailPageCausticSoda() {
  return (
    <div className="bg-white relative size-full" data-name="Product Detail Page - Caustic Soda">
      <PrimAryColor />
      <Group2 />
      <GreyColor />
      <Text />
    </div>
  );
}