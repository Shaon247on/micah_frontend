'use client';

import { useState } from 'react';

import {
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';

import AddServiceModal from '@/components/dashboard/AddServiceModal';

const services = [
  {
    id: 1,
    title: 'AC Installation',
    category: 'Cooling',
    desc: 'Professional installation of high-efficiency air conditioning systems.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
  },
  {
    id: 2,
    title: 'HVAC Maintenance',
    category: 'Maintenance',
    desc: 'Comprehensive seasonal tune-ups to keep your system running efficiently.',
    img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80',
  },
  {
    id: 3,
    title: 'Air Duct Cleaning',
    category: 'Indoor Air Quality',
    desc: "Remove dust, allergens, and debris from your home's ductwork.",
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&q=80',
  },
  {
    id: 4,
    title: 'Furnace Repair',
    category: 'Heating',
    desc: 'Fast, reliable repairs for all makes and models of furnaces.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
  },
  {
    id: 5,
    title: 'Thermostat Installation',
    category: 'Smart Home',
    desc: 'Upgrade to a smart thermostat for better comfort and energy savings.',
    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80',
  },
  {
    id: 6,
    title: 'Commercial HVAC',
    category: 'Commercial',
    desc: 'Tailored heating and cooling solutions for businesses of all sizes.',
    img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
  },
];

export default function ServicesManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-(--color-text-main)">
            Services Management
          </h1>

          <p className="mt-1 text-sm text-(--color-text-muted)">
            Manage the HVAC services displayed on your website.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-(--color-primary) px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          Add New Service
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 rounded-md border border-(--color-border) bg-white p-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search services..."
          className="h-11 w-full rounded-md border border-(--color-border) px-4 text-sm outline-none transition focus:border-(--color-primary) md:w-[320px]"
        />

        <select className="h-11 rounded-md border border-(--color-border) bg-white px-4 text-sm outline-none transition focus:border-(--color-primary)">
          <option>All Categories</option>
          <option>Cooling</option>
          <option>Heating</option>
        </select>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col overflow-hidden rounded-xl border border-(--color-border) bg-white"
          >
            {/* Image */}
            <div
              className="h-[200px] bg-cover bg-center"
              style={{
                backgroundImage: `url(${service.img})`,
              }}
            />

            {/* Content */}
            <div className="flex-1 p-6">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.5px] text-(--color-primary)">
                {service.category}
              </span>

              <h3 className="mb-3 text-lg font-semibold text-(--color-text-main)">
                {service.title}
              </h3>

              <p className="text-sm leading-6 text-(--color-text-muted)">
                {service.desc}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 border-t border-(--color-border) px-6 py-4">
              <button className="p-1 text-(--color-text-muted) transition hover:text-(--color-text-main)">
                <Edit size={16} />
              </button>

              <button className="p-1 text-(--color-text-muted) transition hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <AddServiceModal
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}