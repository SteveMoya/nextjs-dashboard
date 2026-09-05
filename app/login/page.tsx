import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login | Acme Dashboard',
    description: 'Login to your account to access the dashboard.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

// Google OAuth es opcional: el botón solo se muestra si el servidor tiene
// configuradas las variables AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET.
const googleEnabled =
    !!process.env.AUTH_GOOGLE_ID && !!process.env.AUTH_GOOGLE_SECRET;

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
                    <div className="w-32 text-white md:w-36">
                        <AcmeLogo />
                    </div>
                </div>
                <LoginForm googleEnabled={googleEnabled} />
            </div>
        </main>
    );
}