const ITEMS = [
  {
    rank: 1,
    name: "Chicken Burger",
    orders: "125 orders",
    revenue: "$1,875.00",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=80&h=80&fit=crop",
  },
  {
    rank: 2,
    name: "Margherita Pizza",
    orders: "98 orders",
    revenue: "$1,470.00",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=80&h=80&fit=crop",
  },
  {
    rank: 3,
    name: "Chicken Biryani",
    orders: "86 orders",
    revenue: "$1,290.00",
    image:
      "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=80&h=80&fit=crop",
  },
];

export default function TopSellingItems() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-gray-900">Top Selling Items</h2>
        <button
          type="button"
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12.5px] font-medium text-gray-600"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {ITEMS.map((item) => (
          <div key={item.rank} className="flex items-center gap-3">
            <span className="w-4 text-[13px] font-semibold text-gray-400">
              {item.rank}
            </span>
            <img
              src={item.image}
              alt={item.name}
              className="h-11 w-11 rounded-xl object-cover"
            />
            <div className="flex-1">
              <p className="text-[13.5px] font-semibold text-gray-900">{item.name}</p>
              <p className="text-[12px] text-gray-400">{item.orders}</p>
            </div>
            <span className="text-[13.5px] font-bold text-gray-900">{item.revenue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
