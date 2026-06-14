export default function HeroBottom() {
  const items = [
    {
      icon: '⭐',
      title: '4.9 Google Rating',
      subtitle: 'Trusted by customers',
    },
    {
      icon: '🏠',
      title: 'Family-owned',
      subtitle: 'Joliet, IL',
    },
    {
      icon: '💳',
      title: 'Financing available',
      subtitle: 'on rejuvenation & new systems',
    },
    {
      icon: '🛡️',
      title: 'Licensed & insured',
      subtitle: 'Joliet and surronding Areas',
    },
  ];

  return (
    <section className="border-b border-gray-200 bg-white font-condensed">
        <div className="grid grid-cols-1 md:grid-cols-4">
          
          {items.map((item, index) => (
            <div
              key={item.title}
              className={`
                flex items-center justify-center gap-3 py-5 text-center
                ${index !== items.length - 1 ? 'md:border-r md:border-gray-200' : ''}
              `}
            >
              
              {/* Icon */}
              <span className="text-sm">
                {item.icon}
              </span>

              {/* Text */}
              <div className="flex items-center gap-1 text-sm">
                <span className="font-semibold text-[#0F2740]">
                  {item.title}
                </span>

                <span className="text-gray-500">
                  · {item.subtitle}
                </span>
              </div>
            </div>
          ))}

        </div>
    </section>
  );
}