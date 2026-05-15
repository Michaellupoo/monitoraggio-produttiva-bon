import React, { useMemo, useState } from "react";
import {
  Activity,
  ChevronDown,
  Download,
  Factory,
  Gauge,
  Info,
  ListFilter,
  Search,
  CheckCircle2,
  Clock3,
  HelpCircle,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react";

const machines = [
  {
    line: "AK01",
    name: "Rover Multi Pro N G 1531",
    serial: "1000078971",
    customerName: "Mood And Wood",
    country: "KR",
    type: "Tubo",
    bon: "1.4.0.873",
    bSuite: "5.0.0.300",
    plc: "16.3.6.48",
    wrt: "PL533",
    status: "Completata",
  },
  {
    line: "AK01",
    name: "Explora Multi Up N A",
    serial: "1000081362",
    customerName: "Biesse SPA Xylexpo",
    country: "IT",
    type: "Preserie",
    bon: "1.5.0.171",
    bSuite: "5.0.0.359",
    plc: "16.3.7.51",
    wrt: "PL547",
    status: "Completata",
  },
  {
    line: "AK02",
    name: "Rover Multi Up M G",
    serial: "1000079479",
    customerName: "Foinikos S.R.L.",
    country: "IT",
    type: "Preserie",
    bon: "1.5.0.173",
    bSuite: "5.0.0.359",
    plc: "16.3.7.50",
    wrt: "PL533",
    status: "Completata",
  },
  {
    line: "AK03",
    name: "Rover Multi Up M G P",
    serial: "1000080956",
    customerName: "Labelle Design",
    country: "IT",
    type: "Tubo",
    bon: "1.4.0.968",
    bSuite: "5.0.0.359",
    plc: "16.3.7.50",
    wrt: "PL533",
    status: "Completata",
  },
  {
    line: "AK03",
    name: "Rover Multi Up S G",
    serial: "1000081347",
    customerName: "Farnazzo Mobili SNC",
    country: "IT",
    type: "Preserie",
    bon: "1.5.0.213",
    bSuite: "5.0.0.359",
    plc: "16.3.7.51",
    wrt: "PL547",
    status: "In Corso",
  },
  {
    line: "AK03",
    name: "Rover Multi Pro M G",
    serial: "1000081558",
    customerName: "Outline Vinduer A/S",
    country: "DK",
    type: "Tubo",
    bon: "1.5.0.173",
    bSuite: "5.0.0.359",
    plc: "16.3.7.51",
    wrt: "PL547",
    status: "In Corso",
  },
];

const lineMeta = {
  AK01: {
    card: "from-blue-50 to-white border-blue-100",
    icon: "from-blue-600 to-blue-500",
    chip: "bg-blue-100 text-blue-700",
    text: "text-blue-700",
  },
  AK02: {
    card: "from-emerald-50 to-white border-emerald-100",
    icon: "from-emerald-600 to-emerald-500",
    chip: "bg-emerald-100 text-emerald-700",
    text: "text-emerald-700",
  },
  AK03: {
    card: "from-violet-50 to-white border-violet-100",
    icon: "from-violet-700 to-violet-500",
    chip: "bg-violet-100 text-violet-700",
    text: "text-violet-700",
  },
};

const statusStyle = {
  Completata: {
    badge: "bg-emerald-100 text-emerald-700",
    dot: "bg-emerald-500",
    icon: CheckCircle2,
  },
  "In Corso": {
    badge: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
    icon: Clock3,
  },
  "Non nota": {
    badge: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
    icon: HelpCircle,
  },
};

const columns = [
  { key: "line", label: "Linea" },
  { key: "name", label: "Macchina" },
  { key: "serial", label: "Matricola" },
  { key: "type", label: "Preserie/Tubo" },
  { key: "bon", label: "B/0n" },
  { key: "bSuite", label: "bSuite" },
  { key: "plc", label: "PLC" },
  { key: "wrt", label: "Patch WRT" },
  { key: "status", label: "Stato" },
];

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

function StatDot({ status, value }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm text-slate-600">
      <span className="flex items-center gap-2">
        <span
          className={classNames(
            "h-2.5 w-2.5 rounded-full",
            statusStyle[status].dot
          )}
        />
        {status}
      </span>
      <span className="font-semibold tabular-nums text-slate-700">{value}</span>
    </div>
  );
}

function SelectBox({ icon: Icon, label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-600">
        {label}
      </span>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-semibold text-slate-800 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        >
          {children}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      </div>
    </label>
  );
}

function StatusBadge({ status }) {
  const Icon = statusStyle[status].icon;

  return (
    <span
      className={classNames(
        "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold",
        statusStyle[status].badge
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}

function Flag({ country }) {
  if (country === "IT") {
    return (
      <span className="inline-flex h-4 w-6 shrink-0 overflow-hidden rounded-[3px] border border-slate-200 shadow-sm">
        <span className="h-full w-1/3 bg-emerald-600" />
        <span className="h-full w-1/3 bg-white" />
        <span className="h-full w-1/3 bg-red-600" />
      </span>
    );
  }

  if (country === "DK") {
    return (
      <span className="relative inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] border border-slate-200 bg-red-600 shadow-sm">
        <span className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-white" />
        <span className="absolute left-[7px] top-0 h-full w-[3px] bg-white" />
      </span>
    );
  }

  if (country === "KR") {
    return (
      <span className="relative inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-sm">
        <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full rotate-[-28deg]">
          <span className="block h-1/2 w-full bg-red-600" />
          <span className="block h-1/2 w-full bg-blue-700" />
        </span>
        <span className="absolute left-[3px] top-[3px] h-[1px] w-[5px] rotate-[-30deg] bg-slate-900" />
        <span className="absolute left-[3px] top-[5px] h-[1px] w-[5px] rotate-[-30deg] bg-slate-900" />
        <span className="absolute right-[3px] bottom-[3px] h-[1px] w-[5px] rotate-[-30deg] bg-slate-900" />
        <span className="absolute right-[3px] bottom-[5px] h-[1px] w-[5px] rotate-[-30deg] bg-slate-900" />
      </span>
    );
  }

  return (
    <span className="inline-block h-4 w-6 shrink-0 rounded-[3px] border border-slate-200 bg-slate-100 shadow-sm" />
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [line, setLine] = useState("Tutte le linee");
  const [status, setStatus] = useState("Tutti gli stati");
  const [sort, setSort] = useState({ key: "line", direction: "asc" });

  const lines = useMemo(
    () => [...new Set(machines.map((machine) => machine.line))],
    []
  );

  const statuses = ["Completata", "In Corso", "Non nota"];

  const lineStats = useMemo(() => {
    return lines.map((item) => {
      const list = machines.filter((machine) => machine.line === item);

      return {
        line: item,
        total: list.length,
        completed: list.filter((machine) => machine.status === "Completata")
          .length,
        inProgress: list.filter((machine) => machine.status === "In Corso")
          .length,
        unknown: list.filter((machine) => machine.status === "Non nota").length,
      };
    });
  }, [lines]);

  const filteredMachines = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return machines
      .filter((machine) => {
        const matchesQuery = !normalizedQuery
          ? true
          : Object.values(machine).some((value) =>
              String(value).toLowerCase().includes(normalizedQuery)
            );

        const matchesLine = line === "Tutte le linee" || machine.line === line;
        const matchesStatus =
          status === "Tutti gli stati" || machine.status === status;

        return matchesQuery && matchesLine && matchesStatus;
      })
      .sort((a, b) => {
        const first = String(a[sort.key] ?? "").toLowerCase();
        const second = String(b[sort.key] ?? "").toLowerCase();
        const result = first.localeCompare(second, "it", { numeric: true });

        return sort.direction === "asc" ? result : -result;
      });
  }, [query, line, status, sort]);

  const totals = useMemo(() => {
    return {
      machines: machines.length,
      completed: machines.filter((machine) => machine.status === "Completata")
        .length,
      inProgress: machines.filter((machine) => machine.status === "In Corso")
        .length,
    };
  }, []);

  const lastUpdated = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());

  function handleSort(key) {
    setSort((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  }

  function exportCsv() {
    const headers = columns.map((column) => column.label);
    const rows = filteredMachines.map((machine) =>
      columns.map((column) => machine[column.key])
    );

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(";")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "monitor-versionamenti.csv";
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <main className="w-full">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-5 py-5 backdrop-blur-xl md:px-8 lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950">
                Monitoraggio Produttiva con B/0n
              </h1>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                Stato di avanzamento linea
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
              <RefreshCw className="h-4 w-4" />
              Ultimo aggiornamento: {lastUpdated}
            </div>
          </div>
        </header>

        <section
          id="dashboard"
          className="w-full space-y-6 px-4 py-6 md:px-6 lg:px-8"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
            <div className="grid gap-4 xl:grid-cols-[1.8fr_1fr_1fr_auto] xl:items-end">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-600">
                  Ricerca
                </span>

                <div className="relative">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    placeholder="Cerca per macchina, matricola, versione..."
                  />
                </div>
              </label>

              <SelectBox
                icon={ListFilter}
                label="Filtra per linea"
                value={line}
                onChange={setLine}
              >
                <option>Tutte le linee</option>
                {lines.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectBox>

              <SelectBox
                icon={Info}
                label="Filtra per stato"
                value={status}
                onChange={setStatus}
              >
                <option>Tutti gli stati</option>
                {statuses.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </SelectBox>

              <button
                onClick={exportCsv}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-slate-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 active:scale-[0.99]"
              >
                <Download className="h-4 w-4" />
                Esporta CSV
              </button>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {lineStats.map((item) => {
              const meta = lineMeta[item.line];

              return (
                <div
                  key={item.line}
                  className={classNames(
                    "rounded-2xl border bg-gradient-to-r p-5 shadow-lg shadow-slate-200/70",
                    meta.card
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={classNames(
                          "flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg",
                          meta.icon
                        )}
                      >
                        <Factory className="h-8 w-8" />
                      </div>

                      <div>
                        <h2
                          className={classNames(
                            "text-2xl font-black",
                            meta.text
                          )}
                        >
                          {item.line}
                        </h2>
                        <p className="mt-2 text-sm font-bold text-slate-600">
                          {item.total}{" "}
                          {item.total === 1 ? "macchina" : "macchine"}
                        </p>
                      </div>
                    </div>

                    <div className="min-w-32 space-y-2">
                      <StatDot status="Completata" value={item.completed} />
                      <StatDot status="In Corso" value={item.inProgress} />
                      <StatDot status="Non nota" value={item.unknown} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
              <div className="flex items-center gap-3">
                <Gauge className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-bold text-slate-500">
                  Totale macchine
                </span>
              </div>
              <p className="mt-3 text-3xl font-black text-slate-950">
                {totals.machines}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-slate-500">
                  Completate
                </span>
              </div>
              <p className="mt-3 text-3xl font-black text-slate-950">
                {totals.completed}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
              <div className="flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-amber-600" />
                <span className="text-sm font-bold text-slate-500">
                  In corso
                </span>
              </div>
              <p className="mt-3 text-3xl font-black text-slate-950">
                {totals.inProgress}
              </p>
            </div>
          </div>

          <div
            id="machines"
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-5">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-slate-600" />
                <h2 className="text-xl font-black text-slate-950">
                  Elenco macchine
                </h2>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                {filteredMachines.length} risultati
              </span>
            </div>

            <div className="w-full overflow-hidden">
              <table className="w-full table-fixed border-collapse text-left text-[13px]">
                <colgroup>
                  <col className="w-[7%]" />
                  <col className="w-[22%]" />
                  <col className="w-[12%]" />
                  <col className="w-[11%]" />
                  <col className="w-[11%]" />
                  <col className="w-[11%]" />
                  <col className="w-[10%]" />
                  <col className="w-[8%]" />
                  <col className="w-[8%]" />
                </colgroup>

                <thead className="bg-slate-50">
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-2 py-3 text-xs font-black leading-tight text-slate-500"
                      >
                        <button
                          onClick={() => handleSort(column.key)}
                          className="inline-flex max-w-full items-center gap-1 truncate text-left transition hover:text-blue-700"
                        >
                          {column.label}
                          <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-slate-300" />
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredMachines.map((machine) => {
                    const meta = lineMeta[machine.line];

                    return (
                      <tr
                        key={`${machine.line}-${machine.serial}`}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-2 py-4 align-top">
                          <span
                            className={classNames(
                              "inline-flex rounded-lg px-2.5 py-1 text-xs font-black",
                              meta.chip
                            )}
                          >
                            {machine.line}
                          </span>
                        </td>

                        <td className="px-2 py-4 align-top text-sm leading-snug break-words">
                          <div className="font-black text-slate-950">
                            {machine.name}
                          </div>

                          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                            <Flag country={machine.country} />
                            <span>{machine.customerName}</span>
                          </div>
                        </td>

                        <td className="px-2 py-4 align-top text-sm font-semibold text-slate-700 tabular-nums break-words">
                          {machine.serial}
                        </td>

                        <td className="px-2 py-4 align-top">
                          <span
                            className={classNames(
                              "inline-flex rounded-lg border px-2.5 py-1 text-xs font-black",
                              machine.type === "Tubo"
                                ? "border-red-600 bg-red-600 text-white"
                                : "border-red-600 bg-white text-red-700"
                            )}
                          >
                            {machine.type}
                          </span>
                        </td>

                        <td className="px-2 py-4 align-top text-sm font-semibold text-slate-800 tabular-nums break-words">
                          {machine.bon}
                        </td>

                        <td className="px-2 py-4 align-top text-sm font-semibold text-slate-800 tabular-nums break-words">
                          {machine.bSuite}
                        </td>

                        <td className="px-2 py-4 align-top text-sm font-semibold text-slate-800 tabular-nums break-words">
                          {machine.plc}
                        </td>

                        <td className="px-2 py-4 align-top text-sm font-semibold text-slate-800 tabular-nums break-words">
                          {machine.wrt}
                        </td>

                        <td className="px-2 py-4 align-top">
                          <StatusBadge status={machine.status} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <footer className="py-8 text-center text-sm font-semibold text-slate-500">
            Biesse SPA
          </footer>
        </section>
      </main>
    </div>
  );
}