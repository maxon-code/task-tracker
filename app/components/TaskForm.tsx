"use client"

import {useState} from "react";

interface Task {
    id: number;
    name: string;
    value: string;
    deadline: string;
    completed: boolean;
}

interface TaskFormProps {
    onAddTask: (task: Task) => void;

}

export default function TaskForm({ onAddTask }: TaskFormProps) {
    const [taskName, setTaskName] = useState("");
    const [taskValue, setTaskValue] = useState("");
    const [taskDeadline, setTaskDeadline] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskName || !taskValue || !taskDeadline) return;

        const newTask: Task = {
            id: Date.now(),
            name: taskName,
            value: taskValue,
            deadline: taskDeadline,
            completed: false,
        };

        onAddTask(newTask);
        setTaskName("");
        setTaskValue("");
        setTaskDeadline("");
    };
    return (
        <div
            className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-slate-700 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
            <h2 className="text-2xl font-semibold text-white mb-6">
                Create a new task
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="taskName" className="block text-sm font-medium text-slate-300 mb-2">
                        Task Name
                    </label>
                    <input
                        type="text"
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="taskValue" className="block text-sm font-medium text-slate-300 mb-2">
                        Task Value / Description
                    </label>
                    <textarea
                        id="taskValue"
                        value={taskValue}
                        onChange={(e) => setTaskValue(e.target.value)}
                        placeholder="Describe the task..."
                        rows={3}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="taskDeadline" className="block text-sm font-medium text-slate-300 mb-2">
                        Task Deadline
                    </label>
                    <input
                        type="date"
                        id="taskDeadline"
                        value={taskDeadline}
                        onChange={(e) => setTaskDeadline(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        required
                    />
                </div>
                {/*Form submit button*/}
                <button type="submit"
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-xl text-sm px-6 py-3 text-center leading-5 transition-all duration-300 hover:scale-105">
                    Add Task
                </button>

            </form>
        </div>
    )
}