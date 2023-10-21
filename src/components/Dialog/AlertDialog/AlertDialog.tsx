import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import success from '../../../assets/image/success.png';
import fail from '../../../assets/image/fail.png';

export interface AlertDialogProps {
    show: boolean;
    title: string;
    message: string;
    result: boolean;
    onClose: () => void;
    //  onOpen: () => void;
}

export default function AlertDialog(props: AlertDialogProps) {
    const { show, title, message, result, onClose } = props;
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-6 py-2 text-left align-middle shadow-xl transition-all">
                                    <div className="flex">
                                        <div>
                                            <img src={result ? success : fail} alt="img" className="w-40 h-40 " />
                                        </div>
                                        <div className="ml-9 w-48 py-6 flex justify-between flex-col">
                                            <h1 className="font-semibold text-lg">{title}</h1>
                                            <p className="text-base">{message}</p>
                                            <div className="text-right">
                                                <button
                                                    onClick={onClose}
                                                    className={`${
                                                        result ? 'bg-green-600' : 'bg-red-600'
                                                    } text-white text-base font-semibold px-6 py-1 med-border opacity-80 transition hover:opacity-100`}
                                                >
                                                    OK
                                                </button>
                                            </div>
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
