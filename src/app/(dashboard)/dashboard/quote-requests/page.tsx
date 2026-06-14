const quotes = [
  {
    id: 'QR-1001',
    date: '2023-10-24',
    customer: 'Michael Rodriguez',
    address: '4521 Oak Street, Joliet, IL',
    phone: 'Phone Number',
    email: 'michel@gmail.com',
    service: 'AC Installation',
    category: 'Residential',
    schedule: '12 March, 2026 : 12:30 PM',
    price: '$140-$480',
  },
  {
    id: 'QR-1002',
    date: '2023-10-23',
    customer: 'Sarah Jenkins',
    address: '890 Pine Lane, Joliet, IL',
    phone: 'Phone Number',
    email: 'Sarah@gmail.com',
    service: 'Furnace Repair',
    category: 'Residential',
    schedule: '20 November, 2026 : 12:30 PM',
    price: '$280-$369',
  },
  {
    id: 'QR-1003',
    date: '2023-10-22',
    customer: 'TechFlow Inc.',
    address: '100 Innovation Dr, Joliet, IL',
    phone: 'Phone Number',
    email: 'Techflow@gmail.com',
    service: 'Commercial HVAC',
    category: 'Commercial',
    schedule: '18 December, 2026 : 12:30 PM',
    price: '$280-$560',
  },
  {
    id: 'QR-1004',
    date: '2023-10-20',
    customer: 'David Chen',
    address: '334 Maple Ave, Joliet, IL',
    phone: 'Phone Number',
    email: 'David@gmail.com',
    service: 'Air Duct Cleaning',
    category: 'Residential',
    schedule: '18 December, 2026 : 12:30 PM',
    price: '$280-$560',
  },
  {
    id: 'QR-1005',
    date: '2023-10-19',
    customer: 'Emily White',
    address: '777 Cedar Blvd, Joliet, IL',
    phone: 'Phone Number',
    email: 'emily@gmail.com',
    service: 'Thermostat Installation',
    category: 'Residential',
    schedule: '13 March, 2026 : 12:30 PM',
    price: '$355-$900',
  },
];

export default function QuoteRequests() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-(--color-text-main)">
          Quote Requests
        </h1>

        <p className="mt-1 text-sm text-(--color-text-muted)">
          Manage and track all incoming service inquiries.
        </p>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-xl border border-(--color-border) bg-white">
        {/* Controls */}
        <div className="flex flex-col gap-4 border-b border-(--color-border) p-6 md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search quotes..."
            className="h-11 w-full rounded-md border border-(--color-border) px-4 text-sm outline-none transition focus:border-(--color-primary) md:w-[300px]"
          />

          <select className="h-11 rounded-md border border-(--color-border) bg-white px-4 text-sm outline-none transition focus:border-(--color-primary)">
            <option>All Service</option>
            <option>AC Installation</option>
            <option>Furnace Repair</option>
          </select>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse">
            <thead>
              <tr className="bg-[#fafafa]">
                <th className="px-6 py-4 text-left text-[13px] font-medium text-(--color-text-muted) border-b border-(--color-border)">
                  REF / Date
                </th>

                <th className="px-6 py-4 text-left text-[13px] font-medium text-(--color-text-muted) border-b border-(--color-border)">
                  Customer Details
                </th>

                <th className="px-6 py-4 text-left text-[13px] font-medium text-(--color-text-muted) border-b border-(--color-border)">
                  Number / Email
                </th>

                <th className="px-6 py-4 text-left text-[13px] font-medium text-(--color-text-muted) border-b border-(--color-border)">
                  Service Type
                </th>

                <th className="px-6 py-4 text-left text-[13px] font-medium text-(--color-text-muted) border-b border-(--color-border)">
                  Schedule
                </th>

                <th className="px-6 py-4 text-left text-[13px] font-medium text-(--color-text-muted) border-b border-(--color-border)">
                  EST. Price
                </th>
              </tr>
            </thead>

            <tbody>
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
                  className="transition hover:bg-[#fafafa]"
                >
                  {/* REF */}
                  <td className="border-b border-(--color-border) px-6 py-4">
                    <div className="mb-1 text-sm font-medium text-(--color-primary)">
                      {quote.id}
                    </div>

                    <div className="text-[13px] text-(--color-text-muted)">
                      {quote.date}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="border-b border-(--color-border) px-6 py-4">
                    <div className="mb-1 text-sm font-medium text-(--color-text-main)">
                      {quote.customer}
                    </div>

                    <div className="text-[13px] text-(--color-text-muted)">
                      {quote.address}
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="border-b border-(--color-border) px-6 py-4">
                    <div className="mb-1 text-sm font-medium text-(--color-text-main)">
                      {quote.phone}
                    </div>

                    <div className="text-[13px] text-(--color-text-muted)">
                      {quote.email}
                    </div>
                  </td>

                  {/* Service */}
                  <td className="border-b border-(--color-border) px-6 py-4">
                    <div className="mb-1 text-sm font-medium text-(--color-text-main)">
                      {quote.service}
                    </div>

                    <div className="text-[13px] text-(--color-text-muted)">
                      {quote.category}
                    </div>
                  </td>

                  {/* Schedule */}
                  <td className="border-b border-(--color-border) px-6 py-4 text-sm font-medium text-(--color-text-main)">
                    {quote.schedule}
                  </td>

                  {/* Price */}
                  <td className="border-b border-(--color-border) px-6 py-4 text-sm font-medium text-(--color-text-main)">
                    {quote.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <span className="text-sm text-(--color-text-muted)">
            Showing 1 to 5 of 5 entries
          </span>

          <div className="flex gap-2">
            <button className="cursor-not-allowed rounded border border-(--color-border) bg-white px-3 py-1.5 text-sm text-(--color-text-main) opacity-50">
              Previous
            </button>

            <button className="rounded border border-(--color-primary-light) bg-(--color-primary-light) px-3 py-1.5 text-sm font-medium text-(--color-primary)">
              1
            </button>

            <button className="rounded border border-(--color-border) bg-white px-3 py-1.5 text-sm text-(--color-text-main) transition hover:bg-gray-100">
              2
            </button>

            <button className="rounded border border-(--color-border) bg-white px-3 py-1.5 text-sm text-(--color-text-main) transition hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}