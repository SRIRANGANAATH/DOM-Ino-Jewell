"use client";

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function OdometerDigit({ targetValue }: { targetValue: number }) {
  return (
    <span className="relative inline-block overflow-hidden h-[1.1em] min-w-[0.55em] text-center -mb-[0.1em]">
      <span
        className="absolute top-0 left-0 flex flex-col transition-transform duration-[1500ms] ease-[cubic-bezier(0.2,1,0.2,1)]"
        style={{ transform: `translateY(-${targetValue * 1.1}em)` }}
      >
        {NUMBERS.map((num) => (
          <span key={num} className="h-[1.1em] leading-[1.1em] flex items-center justify-center">
            {num}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function Odometer({ value }: { value: number }) {
  const formattedString = value.toLocaleString('en-IN');
  const chars = formattedString.split('');

  return (
    <span className="inline-flex font-medium items-center">
      {chars.map((char, index) => {
        const isDigit = /^[0-9]$/.test(char);
        const key = chars.length - index;
        if (isDigit) {
          return <OdometerDigit key={key} targetValue={parseInt(char, 10)} />;
        }
        return <span key={key} className="inline-block -mx-[0.05em] translate-y-[0.15em]">{char}</span>;
      })}
    </span>
  );
}
