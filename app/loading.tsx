import { LoadingSpinnerWithText } from '@/components/loading-spinner';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinnerWithText text="Loading Licit Axiom..." />
        </div>
    );
}
