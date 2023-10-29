import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ReactNode } from 'react';
import './ModalContainer.css';
export interface ModalContainerProps {
    show: boolean;
    width: string;
    full?: boolean;
    onClose: () => void;
    children?: ReactNode;
}

function ModalContainer(props: ModalContainerProps) {
    const { show, full = false, width, onClose, children } = props;

    console.log(full);

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={`${
                                        full && 'w-full'
                                    } ${width}  transform overflow-hidden rounded-2xl bg-white  py-2 text-left align-middle shadow-xl transition-all`}
                                >
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default ModalContainer;
