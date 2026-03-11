"use client"
import {useState, useEffect} from "react";
import Image from "next/image";
import TaskForm from "@/app/components/TaskForm";
import EditTaskForm from "@/app/components/EditTaskForm";

interface Task {
    id: number;
    name: string;
    value: string;
    deadline: string;
    completed: boolean;
}
export default function Home() {
    const [showForm, setShowForm] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const handleSaveEdit = (updatedTask: Task) => {
        setTasks(
            tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditingTaskId(null);
    };
    useEffect(() => {
        const saved = localStorage.getItem("tasks");
        if (saved) setTasks(JSON.parse(saved));
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (!isLoaded) return;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks, isLoaded]);


    const handleAddTask = (task: Task) => {
        setTasks([...tasks, task]);
        setShowForm(false);
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    }
    const toggleComplete = (id: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        )
    }
    const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };
    return (
        <>
            <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
                {/*Button for adding new tasks*/}
                <div className="flex justify-center mb-8">
                    <button
                        type="button"
                        onClick={() => setShowForm(!showForm)}
                        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-xl text-sm px-6 py-3 text-center leading-5 transition-all duration-300 hover:scale-105"
                    >
                        {showForm ? "Cancel" : "+ Add New Task"}
                    </button>
                </div>

                {/*Task Form*/}
                {showForm && (
                    <TaskForm
                        onAddTask={handleAddTask}
                        onCancel={() => setShowForm(false)}
                    />
                )}
                {/*To do list*/}
                <div className="space-y-4">
                    {tasks.length === 0 ? (
                        // EMPTY STATE (when there are no tasks)
                        <div
                            className="text-center py-16 bg-slate-800/40 rounded-2xl border border-slate-700/50 shadow-lg shadow-cyan-500/20">
                            <div className="flex justify-center mb-4">
                                <Image width="70" height="70" src="/task.png" alt="Task Icon"/>
                            </div>
                            <p className="text-slate-400 text-lg">No tasks yet</p>
                            <p className="text-slate-500 text-sm mt-2">
                                Click the button above to add your first task
                            </p>
                        </div>
                    ) : (
                        // List of completed tasks
                        tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg ${
                                    task.completed
                                        ? "border-green-500/30 transition-shadow duration-800 hover:shadow-green-500/50"
                                        : new Date(task.deadline) < new Date()
                                            ? "border-red-500/30 transition-shadow duration-800 hover:shadow-red-500/50"
                                            : "border-slate-700 transition-shadow duration-800 hover:shadow-cyan-500/50"
                                }`}
                            >
                                {/*Content of task*/}
                                {editingTaskId === task.id ? (
                                    <EditTaskForm task={task} onSave={handleSaveEdit}
                                                  onCancel={() => setEditingTaskId(null)}/>
                                ) : (
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1">

                                            {/*Checkbox
                                         List of made tasksof task*/}
                                            <button
                                                type="button"
                                                onClick={() => toggleComplete(task.id)}
                                                className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                                    task.completed
                                                        ? "bg-green-500 border-green-500"
                                                        : "border-slate-500 hover:border-cyan-400"
                                                }`}
                                            >
                                                {task.completed && (
                                                    <Image width="15" height="15" src="/tick.png" alt="Tick Icon"/>
                                                )}
                                            </button>

                                            {/*Text of task*/}
                                            <div className="flex-1">
                                                <h3
                                                    className={`text-xl font-semibold mb-2 ${
                                                        task.completed
                                                            ? "text-slate-400 line-through"
                                                            : "text-white"
                                                    }`}
                                                >
                                                    {task.name}
                                                </h3>
                                                <p
                                                    className={`mb-3 ${
                                                        task.completed ? "text-slate-500" : "text-slate-300"
                                                    }`}
                                                >
                                                    {task.value}
                                                </p>

                                                {/*Status of deadline*/}
                                                <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                                task.completed
                                    ? "bg-green-500/20 text-green-400"
                                    : new Date(task.deadline) < new Date()
                                        ? "bg-red-500/20 text-red-400"
                                        : "bg-cyan-500/20 text-cyan-400"
                            }`}
                        >
                          <Image width="10" height="10" src="/calendar.png" alt="Calendar Icon"/>
                            {formatDate(task.deadline)}
                            {!task.completed && new Date(task.deadline) < new Date() && (
                                <span className="ml-1">(Overdue)</span>
                            )}
                        </span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setEditingTaskId(task.id)}
                                            className="p-2 text-slate-400 hover:bg-cyan-200/80 rounded-lg transition-all"
                                        >
                                            <Image alt="Trash Icon" width="20" height="20" src="/pencil-white.png"/>
                                        </button>
                                        {/*Delete button*/}
                                        <button
                                            type="button"
                                            onClick={() => deleteTask(task.id)}
                                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/50 rounded-lg transition-all"
                                        >
                                            <Image alt="Trash Icon" width="20" height="20" src="/trash-can.png"/>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}

                </div>
            </main>
        </>
    )
}
