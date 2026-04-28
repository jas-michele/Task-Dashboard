import React from "react";
import { useState } from "react";
import type { Task, TaskFormProps } from "../../types";

export const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
    const [formState, setFormState] = useState({
        title: "",
        description: "",
        priority: "low" as Task["priority"],
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value} = e.target;

        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = () => {

        if (!formState.title.trim()) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: formState.title,
            description: formState.description,
            status: "pending",
            priority: formState.priority,
            dueDate: new Date().toISOString()

        };

        onAddTask(newTask);

        setFormState({
            title: "",
            description: "",
            priority: "low",
        });
    }

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
             />
         </form>
    )
}

