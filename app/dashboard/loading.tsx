
//import AcmeLogo from '@/app/ui/acme-logo';
import DashboardSkeleton from '../ui/skeletons';

export default function Loading() {
    return (
        //  Pudieramos usar esto que es un Loading sencillo 
        // <div className="flex flex-col items-center justify-center h-screen">
        //         <div className='bg-blue-600 p-3 rounded-md'>
        //     <AcmeLogo />
        //         </div>
        //     <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        // <h2 className="text-4xl font-bold text-gray-800">Loading...</h2>
        // </div> 
        // O usar
        <DashboardSkeleton />
    );
}