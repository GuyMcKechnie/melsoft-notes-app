import React from "react";

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Notes
                    </h1>
                    <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                        Logout
                    </button>
                </div>

                <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                    <h2 className="mb-4 text-xl font-bold text-gray-700">
                        Create New Note
                    </h2>
                    <textarea
                        className="focus:shadow-outline mb-4 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        placeholder="Write your note here..."
                        rows={4}
                    ></textarea>
                    <button className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
                        Add Note
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Placeholder Notes */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <p className="text-gray-700">This is a sample note.</p>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button className="text-sm text-blue-500 hover:text-blue-700">
                                Edit
                            </button>
                            <button className="text-sm text-red-500 hover:text-red-700">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
