import { ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

export interface ConfirmDialogProps {
    show: boolean;
    confirmText: string;
    cancelText: string;
    title: string;
    onConfirm: () => void;
    onCancel: () => void;
    onClose: () => void;
    children?: ReactNode;
}

function ConfirmDialog(props: ConfirmDialogProps) {
    const { show, confirmText, cancelText, title, onConfirm, onCancel, onClose, children } = props;
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  py-2 text-left align-middle shadow-xl transition-all">
                                    <div className="flex flex-col text-center">
                                        <div>{children}</div>
                                        <div className="mt-2 text-lg">{title}</div>
                                        <div
                                            onClick={onConfirm}
                                            className="h-11 mt-3 flex items-center justify-center border-t-2 border-gray-400 px-6 text-lg font-semibold text-red-500 cursor-pointer hover:bg-slate-100 transition"
                                        >
                                            <h1>{confirmText}</h1>
                                        </div>
                                        <div
                                            onClick={onCancel}
                                            className="h-10 flex items-center justify-center cursor-pointer border-t-2 border-gray-400 px-6 text-lg hover:bg-slate-100 transition"
                                        >
                                            <h1>{cancelText}</h1>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default ConfirmDialog;
