"use client"

import { useState } from "react";

interface Task {
    id: number;
    name: string;
    value: string;
    deadline: string;
    completed: boolean;
}

interface EditTaskFormProps {
    task: Task;
    onSave: (updatedTask: Task) => void;
    onCancel: () => void;
}

export default function EditTaskForm({task, onSave, onCancel} : EditTaskFormProps) {
    const [editName, setEditName] = useState(task.name);
    const [editValue, setEditValue] = useState(task.value);
    const [editDeadline, setEditDeadline] = useState(task.deadline);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editName || !editValue || !editDeadline) return;

        onSave({
            ...task,
            name: editName,
            value: editValue,
            deadline: editDeadline,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Task Name
                </label>
                <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Task Value / Description
                </label>
                <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                    Task Deadline
                </label>
                <input
                    type="date"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    required
                />
            </div>
            <div className="flex gap-3">
                <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-xl text-sm px-5 py-2.5 transition-all duration-300"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="text-slate-300 bg-slate-700 hover:bg-slate-600 font-medium rounded-xl text-sm px-5 py-2.5 transition-all duration-300"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}