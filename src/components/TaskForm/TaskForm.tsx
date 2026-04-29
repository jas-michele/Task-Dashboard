import React from "react";
import { useState, useEffect } from "react";
import type { Task, TaskFormProps } from "../../types";

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, initialData }) => {
    const [formState, setFormState] = useState({
        title: "",
        description: "",
        priority: "low" as Task["priority"],
    });
    useEffect(() => {
        if (initialData) {
            // Editing mode → fill form with existing task
            setFormState({
                title: initialData.title,
                description: initialData.description,
                priority: initialData.priority,
            });
        } else {
            // Create mode → reset form
            setFormState({
                title: "",
                description: "",
                priority: "low",
            });
        }
    }, [initialData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = () => {
        if (!formState.title.trim()) return;

        const newTask: Task = {
            id: initialData?.id || crypto.randomUUID(),
            title: formState.title,
            description: formState.description,
            status: initialData?.status || "pending",
            priority: formState.priority,
            dueDate: initialData?.dueDate || new Date().toISOString(),
        };

        onSubmit(newTask);

        setFormState({
            title: "",
            description: "",
            priority: "low",
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
        >
            <input
                placeholder="Task title"
                name="title"
                value={formState.title}
                onChange={handleChange}
            />

            <input
                placeholder="Description"
                name="description"
                value={formState.description}
                onChange={handleChange}
            />

            <select
                name="priority"
                value={formState.priority}
                onChange={handleChange}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit">
                {initialData ? "Update Task" : "Add Task"}
            </button>

        </form>
    )
}

