import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ---------- Sample data ---------- */

const monthly = [
  { month: "Jan", sales: 42000, orders: 120 },
  { month: "Feb", sales: 51000, orders: 150 },
  { month: "Mar", sales: 38000, orders: 110 },
  { month: "Apr", sales: 64000, orders: 190 },
  { month: "May", sales: 72000, orders: 210 },
  { month: "Jun", sales: 58000, orders: 170 },
  { month: "Jul", sales: 81000, orders: 240 },
  { month: "Aug", sales: 76000, orders: 225 },
];

const traffic = [
  { name: "Search engines", value: 40, color: "#0e9f8e" },
  { name: "Direct", value: 35, color: "#f2a33a" },
  { name: "Social media", value: 25, color: "#e5604d" },
];

const orders = [
  { id: "#1001", customer: "Arun Kumar", product: "Wireless earbuds", amount: 2499, status: "Delivered", date: "2026-10-01" },
  { id: "#1002", customer: "Priya Sharma", product: "Smart watch", amount: 5999, status: "Pending", date: "2026-10-02" },
  { id: "#1003", customer: "Karthik Raj", product: "Laptop bag", amount: 1299, status: "Shipped", date: "2026-10-02" },
  { id: "#1004", customer: "Divya Menon", product: "Bluetooth speaker", amount: 3199, status: "Delivered", date: "2026-10-03" },
  { id: "#1005", customer: "Suresh Babu", product: "Running shoes", amount: 2799, status: "Cancelled", date: "2026-10-04" },
  { id: "#1006", customer: "Meena Iyer", product: "Desk lamp", amount: 999, status: "Delivered", date: "2026-10-05" },
  { id: "#1007", customer: "Vijay Anand", product: "Mechanical keyboard", amount: 4599, status: "Shipped", date: "2026-10-06" },
  { id: "#1008", customer: "Lakshmi Devi", product: "Yoga mat", amount: 899, status: "Pending", date: "2026-10-07" },
  { id: "#1009", customer: "Rahul Nair", product: "Power bank", amount: 1599, status: "Delivered", date: "2026-10-08" },
  { id: "#1010", customer: "Anitha Selvam", product: "Backpack", amount: 1899, status: "Shipped", date: "2026-10-09" },
  { id: "#1011", customer: "Mohan Das", product: "Gaming mouse", amount: 1799, status: "Pending", date: "2026-10-10" },
  { id: "#1012", customer: "Sneha Pillai", product: "Water bottle", amount: 499, status: "Delivered", date: "2026-10-11" },
];

const menu = [
  { name: "Overview", icon: "▦" },
  { name: "Orders", icon: "☰" },
  { name: "Users", icon: "☺" },
  { name: "Settings", icon: "⚙" },
];

const statusStyles = {
  Delivered: "bg-teal/15 text-teal",
  Shipped: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  Pending: "bg-saffron/20 text-amber-700 dark:text-saffron",
  Cancelled: "bg-coral/15 text-coral",
};

const rupees = (n) => "₹" + n.toLocaleString("en-IN");

/* ---------- Small components ---------- */

function StatCard({ label, value, note, accent }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-3 h-1 w-10 rounded-full" style={{ background: accent }} />
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-ink dark:text-white">{value}</p>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{note}</p>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-4 text-base font-semibold text-ink dark:text-white">{title}</h2>
      {children}
    </div>
  );
}

function SalesChart({ dark }) {
  const axis = dark ? "#94a3b8" : "#64748b";
  return (
    <Card title="Monthly sales and orders">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke={dark ? "#334155" : "#e2e8f0"} />
            <XAxis dataKey="month" stroke={axis} fontSize={12} />
            <YAxis yAxisId="left" stroke={axis} fontSize={12} tickFormatter={(v) => v / 1000 + "k"} />
            <YAxis yAxisId="right" orientation="right" stroke={axis} fontSize={12} />
            <Tooltip
              contentStyle={{
                background: dark ? "#1e293b" : "#fff",
                border: "1px solid " + (dark ? "#334155" : "#e2e8f0"),
                borderRadius: 8,
              }}
              formatter={(value, name) => (name === "Sales" ? rupees(value) : value)}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="sales" name="Sales" fill="#0e9f8e" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#f2a33a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function TrafficChart() {
  return (
    <Card title="Traffic sources">
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={traffic} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={3}>
              {traffic.map((t) => (
                <Cell key={t.name} fill={t.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip formatter={(v) => v + "%"} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {traffic.map((t) => (
          <li key={t.name} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ background: t.color }} />
              {t.name}
            </span>
            <span>{t.value}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function OrdersTable() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = orders.filter((o) =>
      [o.id, o.customer, o.product, o.status].join(" ").toLowerCase().includes(q)
    );
    return [...filtered].sort((a, b) => {
      const x = a[sortKey];
      const y = b[sortKey];
      const result = typeof x === "number" ? x - y : String(x).localeCompare(String(y));
      return sortDir === "asc" ? result : -result;
    });
  }, [query, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(rows.length / perPage));
  const current = Math.min(page, pageCount);
  const visible = rows.slice((current - 1) * perPage, current * perPage);

  const changeSort = (key) => {
    if (key === sortKey) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const columns = [
    { key: "id", label: "Order" },
    { key: "customer", label: "Customer" },
    { key: "product", label: "Product" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ];

  return (
    <Card title="Recent orders">
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        placeholder="Search by customer, product or status"
        aria-label="Search orders"
        className="mb-4 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/30 dark:border-slate-600 dark:text-white sm:max-w-xs"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400">
              {columns.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-3 py-2 font-medium">
                  <button onClick={() => changeSort(c.key)} className="flex items-center gap-1 hover:text-ink dark:hover:text-white">
                    {c.label}
                    {sortKey === c.key && <span>{sortDir === "asc" ? "▲" : "▼"}</span>}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((o) => (
              <tr key={o.id} className="border-b border-slate-100 text-ink dark:border-slate-700/60 dark:text-slate-200">
                <td className="px-3 py-3">{o.id}</td>
                <td className="whitespace-nowrap px-3 py-3">{o.customer}</td>
                <td className="whitespace-nowrap px-3 py-3">{o.product}</td>
                <td className="px-3 py-3">{rupees(o.amount)}</td>
                <td className="px-3 py-3">
                  <span className={"rounded-full px-2.5 py-1 text-xs font-medium " + statusStyles[o.status]}>{o.status}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-3">{o.date}</td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-slate-500">
                  No orders match your search. Try a different word.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          Page {current} of {pageCount}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(Math.max(1, current - 1))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(Math.min(pageCount, current + 1))}
            className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}

function Placeholder({ name }) {
  return (
    <Card title={name}>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        This page is not built yet. Add your {name.toLowerCase()} content here.
      </p>
    </Card>
  );
}

/* ---------- Main app ---------- */

export default function App() {
  const [dark, setDark] = useState(false);
  const [page, setPage] = useState("Overview");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const revenue = orders.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="min-h-screen bg-slate-100 text-ink dark:bg-slate-900">
      {/* Sidebar */}
      <aside
        className={
          "fixed inset-y-0 left-0 z-30 w-60 border-r border-slate-200 bg-white p-5 transition-transform dark:border-slate-700 dark:bg-slate-800 md:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <p className="mb-8 text-xl font-semibold text-ink dark:text-white">
          Shop<span className="text-teal">Pulse</span>
        </p>
        <nav className="space-y-1">
          {menu.map((m) => (
            <button
              key={m.name}
              onClick={() => {
                setPage(m.name);
                setOpen(false);
              }}
              className={
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors " +
                (page === m.name
                  ? "bg-teal/15 font-medium text-teal"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700")
              }
            >
              <span aria-hidden="true">{m.icon}</span>
              {m.name}
            </button>
          ))}
        </nav>
      </aside>

      {open && <div onClick={() => setOpen(false)} className="fixed inset-0 z-20 bg-black/40 md:hidden" />}

      {/* Content */}
      <div className="md:ml-60">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-lg md:hidden dark:border-slate-600 dark:text-white"
            >
              ☰
            </button>
            <h1 className="text-lg font-semibold text-ink dark:text-white">{page}</h1>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-ink hover:bg-slate-100 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700"
          >
            {dark ? "Light mode" : "Dark mode"}
          </button>
        </header>

        <main className="space-y-5 p-5">
          {page === "Overview" && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard label="Revenue" value={rupees(revenue)} note="From non-cancelled orders" accent="#0e9f8e" />
                <StatCard label="Orders" value={orders.length} note="Placed this month" accent="#f2a33a" />
                <StatCard label="Visitors online" value="1,284" note="Up 5% from last week" accent="#e5604d" />
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <SalesChart dark={dark} />
                </div>
                <TrafficChart />
              </div>
              <OrdersTable />
            </>
          )}
          {page === "Orders" && <OrdersTable />}
          {page === "Users" && <Placeholder name="Users" />}
          {page === "Settings" && <Placeholder name="Settings" />}
        </main>
      </div>
    </div>
  );
}