import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({params} : {params : {id: string}}){
    const id = params.id
    const [ invoice, customers] = await Promise.all([
        fetchInvoiceById(id),
        fetchCustomers()
    ])
    if(!invoice){
        notFound()
    }
    return (
        <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'Create Invoice',
              href: '/dashboard/invoices/create',
              active: true,
            },
          ]}
        />
        <Form customers={customers} invoice={{
                id: '',
                customer_id: '',
                amount: 0,
                status: 'pending'
            }} />
      </main>
    )
}