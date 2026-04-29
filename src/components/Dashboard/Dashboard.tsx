import React, { useState } from "react";

import type { Task, Filters } from "../../types";

import { TaskForm } from "../TaskForm/TaskForm";
import { TaskFilter } from "../TaskFilter/TaskFilter";
import { TaskItem } from "../TaskList/TaskItem";

import filterTasks from "../../utils/taskUtils";

export const Dashboard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filters, setFilters] = useState<Filters>({});
    const [search, setSearch] = useState("");
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAddTask = (task: Task) => {
        setTasks(prev => [...prev, task]);
    }

    const handleDelete = (id: string) => {
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    const handleStatusChange = (id: string, status: Task["status"]) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === id ? { ...task, status } : task
            )
        );
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    }

    const handleUpdateTask = (updatedTask: Task) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === updatedTask.id ? updatedTask : task
            )
        )

        setEditingTask(null);
    }

    const searchTerm = search.toLowerCase();

    const filteredTasks = filterTasks(tasks, filters).filter(task =>
        task.title.toLowerCase().includes(searchTerm) ||
        (task.description ?? "").toLowerCase().includes(searchTerm)
    )

    return (
        <div>
            <h2>Dashboard</h2>
            <input
                type="text"
                placeholder="Search tasks"
                value={search}
                onChange={((e) => setSearch(e.target.value))}
            />

            <TaskFilter onFilterChange={setFilters} />

            <TaskForm
                onSubmit={editingTask ? handleUpdateTask : handleAddTask}
                initialData={editingTask}
            />

            {editingTask && <p>Editing: {editingTask.title}</p>}

            <div>
                {filteredTasks.length === 0 ? (
                    <p>No tasks found</p>
                ) : (
                    filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onDelete={handleDelete}
                            onStatusChange={handleStatusChange}
                            onEdit={handleEdit}
                        />
                    ))
                )}
            </div>
        </div>
    )
}