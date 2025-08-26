import React from 'react';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
export function ConfirmOrder({
                                  isOpen,
                                  onClose,
                                  title,
                                  children,
                                  onSave,
                                  isLoading,
                              }: {
    isOpen: boolean;
    onClose: () => void;
    initialRef?: React.RefObject<any>;
    finalRef?: React.RefObject<any>;
    title: string;
    children: React.ReactNode;
    onSave: () => void;
    isLoading?: boolean;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader >{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                    <Button
                        onClick={onSave}
                        colorScheme="teal"
                        mr={3}
                        isLoading={isLoading}
                        loadingText="ກຳລັງສັ່ງ..."
                    >
                        ຢືນຢັນ
                    </Button>
                    <Button onClick={onClose}>ຍົກເລີກ</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
