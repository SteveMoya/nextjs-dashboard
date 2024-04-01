import LatestInvoices from "../ui/dashboard/latest-invoices"
import RevenueChart from "../ui/dashboard/revenue-chart"
import { lusitana } from "../ui/fonts"

import {Suspense} from "react"
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "../ui/skeletons"
import { Card } from "../ui/dashboard/cards"
import { fetchCardData } from "../lib/data"


export default async function DashboardPage() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* El componente Suspense es nativo de React, asi que se puede utilizar en cualquier otro proyecto */}
        <Suspense fallback={<CardSkeleton />} >
          <Card title="Collected" value={totalPaidInvoices} type="collected" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />} >
          <Card title="Pending" value={totalPendingInvoices} type="pending" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />} >
          <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        </Suspense>
        <Suspense fallback={<CardSkeleton />} >
          <Card title="Total Customers" value={numberOfCustomers} type="customers" />
        </Suspense>
      </section>
      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8"> 
        <Suspense fallback={<RevenueChartSkeleton />}>
         <RevenueChart /> 
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
         <LatestInvoices />
        </Suspense>
      </section>
    </main>
  )
}
