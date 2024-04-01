import { Metadata } from 'next';
import CustomersTable from '@/app/ui/customers/table';
import {  fetchAllCustomers, fetchCustomers  } from '@/app/lib/data';
import { FormattedCustomersTable } from '@/app/lib/definitions';
import { Suspense } from 'react';
import { TableRowSkeleton } from '@/app/ui/skeletons';


export const metadata: Metadata = {
  title: 'Customers | Acme Dashboard',
  description: 'View and manage all your customers in one place',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
const customers = await fetchAllCustomers()

export default function CustomersPage() {

  return (
    <>
      <Suspense fallback={<TableRowSkeleton />}>
      <CustomersTable customers={customers} />
      </Suspense>
    </>
  )
}
