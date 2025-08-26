import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const toast = useToast();

    const isAuthenticated = !!localStorage.getItem('customer_id');

    useEffect(() => {
        if (!isAuthenticated) {
            toast({
                title: 'ກະລຸນາເຂົ້າສູ່ລະບົບກ່ອນ',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
        }
    }, [isAuthenticated, toast]);

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;